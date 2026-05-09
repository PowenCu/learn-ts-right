import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Code2, FileText } from "lucide-react";
import { lessons, type Lesson } from "@/data/lessons";

interface SearchHit {
  lesson: Lesson;
  kind: "lesson" | "code";
  snippet: string;
}

function buildIndex(): Array<{ lesson: Lesson; haystack: string; codeBlocks: string[] }> {
  return lessons.map((l) => {
    const codeBlocks: string[] = [];
    const re = /```\w*\n([\s\S]*?)```/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(l.content)) !== null) codeBlocks.push(m[1]);
    return {
      lesson: l,
      haystack: `${l.title} ${l.excerpt} ${l.category} ${l.content}`.toLowerCase(),
      codeBlocks,
    };
  });
}

const INDEX = buildIndex();

function search(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: SearchHit[] = [];
  for (const entry of INDEX) {
    if (entry.haystack.includes(q)) {
      hits.push({ lesson: entry.lesson, kind: "lesson", snippet: entry.lesson.excerpt });
    }
    for (const block of entry.codeBlocks) {
      const lower = block.toLowerCase();
      const idx = lower.indexOf(q);
      if (idx >= 0) {
        const start = Math.max(0, idx - 20);
        const snippet = block.slice(start, start + 80).replace(/\s+/g, " ").trim();
        hits.push({ lesson: entry.lesson, kind: "code", snippet: "…" + snippet + "…" });
      }
    }
  }
  return hits.slice(0, 12);
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const results = useMemo(() => search(q), [q]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const go = (slug: string) => {
    setOpen(false);
    setQ("");
    navigate(`/lessons/${slug}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl p-0 gap-0">
        <DialogHeader className="sr-only"><DialogTitle>Search</DialogTitle></DialogHeader>
        <div className="border-b p-3 flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <Input
            autoFocus
            placeholder="Search lessons and code… (⌘K)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="border-0 focus-visible:ring-0 px-0 h-8"
          />
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {q && results.length === 0 && (
            <p className="p-6 text-sm text-muted-foreground text-center">No matches</p>
          )}
          {!q && (
            <p className="p-6 text-sm text-muted-foreground text-center">
              Search by lesson title, topic, or code snippet
            </p>
          )}
          {results.map((hit, i) => (
            <button
              key={i}
              onClick={() => go(hit.lesson.slug)}
              className="w-full text-left p-3 rounded-md hover:bg-muted transition-colors flex gap-3 items-start"
            >
              <div className="mt-0.5 text-muted-foreground">
                {hit.kind === "code" ? <Code2 className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate">{hit.lesson.title}</span>
                  <Badge variant="secondary" className="text-xs">{hit.lesson.category}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate font-mono">
                  {hit.snippet}
                </p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
