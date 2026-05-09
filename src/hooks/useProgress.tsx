import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

const STORAGE_KEY = "lts_progress";

interface ProgressEntry {
  slug: string;
  completedAt: string;
}

function readLocal(): ProgressEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeLocal(entries: ProgressEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function useProgress() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setEntries(readLocal());
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("lesson_progress")
      .select("lesson_slug, completed_at")
      .order("completed_at", { ascending: false });
    setEntries(
      (data ?? []).map((r) => ({ slug: r.lesson_slug, completedAt: r.completed_at }))
    );
    setLoading(false);
  }, [user]);

  // Sync local → DB on login, then refresh
  useEffect(() => {
    let cancelled = false;
    const sync = async () => {
      if (user) {
        const local = readLocal();
        if (local.length > 0) {
          await supabase.from("lesson_progress").upsert(
            local.map((e) => ({
              user_id: user.id,
              lesson_slug: e.slug,
              completed_at: e.completedAt,
            })),
            { onConflict: "user_id,lesson_slug", ignoreDuplicates: true }
          );
          localStorage.removeItem(STORAGE_KEY);
        }
      }
      if (!cancelled) await refresh();
    };
    sync();
    return () => {
      cancelled = true;
    };
  }, [user, refresh]);

  const markComplete = useCallback(
    async (slug: string) => {
      const now = new Date().toISOString();
      if (!user) {
        const next = [{ slug, completedAt: now }, ...readLocal().filter((e) => e.slug !== slug)];
        writeLocal(next);
        setEntries(next);
        return;
      }
      await supabase.from("lesson_progress").upsert(
        { user_id: user.id, lesson_slug: slug, completed_at: now },
        { onConflict: "user_id,lesson_slug" }
      );
      await refresh();
    },
    [user, refresh]
  );

  const reset = useCallback(async () => {
    if (!user) {
      writeLocal([]);
      setEntries([]);
      return;
    }
    await supabase.from("lesson_progress").delete().eq("user_id", user.id);
    setEntries([]);
  }, [user]);

  const completedSlugs = new Set(entries.map((e) => e.slug));

  return { entries, completedSlugs, loading, markComplete, reset, refresh };
}
