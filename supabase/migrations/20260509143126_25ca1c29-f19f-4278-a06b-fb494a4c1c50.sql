
CREATE TABLE public.lesson_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_slug TEXT NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT CHECK (char_length(comment) <= 1000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_slug)
);

ALTER TABLE public.lesson_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view their own feedback"
  ON public.lesson_feedback FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert their own feedback"
  ON public.lesson_feedback FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update their own feedback"
  ON public.lesson_feedback FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users delete their own feedback"
  ON public.lesson_feedback FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_lesson_feedback_updated_at
  BEFORE UPDATE ON public.lesson_feedback
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_lesson_feedback_slug ON public.lesson_feedback(lesson_slug);
