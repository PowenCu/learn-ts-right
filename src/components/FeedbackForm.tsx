import { useEffect, useState } from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const schema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(1000).optional(),
});

interface FeedbackFormProps {
  lessonSlug: string;
}

export function FeedbackForm({ lessonSlug }: FeedbackFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [existingId, setExistingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("lesson_feedback")
      .select("id, rating, comment")
      .eq("lesson_slug", lessonSlug)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setExistingId(data.id);
          setRating(data.rating);
          setComment(data.comment ?? "");
        }
      });
  }, [user, lessonSlug]);

  const submit = async () => {
    if (!user) return;
    const parsed = schema.safeParse({ rating, comment: comment || undefined });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("lesson_feedback").upsert(
      {
        user_id: user.id,
        lesson_slug: lessonSlug,
        rating: parsed.data.rating,
        comment: parsed.data.comment ?? null,
      },
      { onConflict: "user_id,lesson_slug" }
    );
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(existingId ? "Feedback updated" : "Thanks for your feedback!");
  };

  return (
    <Card id="feedback" className="mt-12 scroll-mt-24">
      <CardHeader>
        <CardTitle className="text-lg">Was this lesson helpful?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!user ? (
          <p className="text-sm text-muted-foreground">
            <Link to="/auth" className="underline">Sign in</Link> to leave feedback.
          </p>
        ) : (
          <>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(n)}
                  aria-label={`${n} stars`}
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      n <= (hover || rating)
                        ? "fill-warning text-warning"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Optional comment (max 1000 characters)"
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 1000))}
              rows={3}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{comment.length} / 1000</span>
              <Button onClick={submit} disabled={submitting || rating === 0}>
                {submitting ? "Saving…" : existingId ? "Update" : "Submit"}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
