import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/CodeBlock";
import { ArrowLeft, ArrowRight, Check, Clock } from "lucide-react";
import { getAdjacentLessons, getLesson } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import { toast } from "sonner";

function renderContent(content: string) {
  const parts = content.split(/```(\w*)\n([\s\S]*?)```/g);
  const blocks: React.ReactNode[] = [];
  for (let i = 0; i < parts.length; i++) {
    if (i % 3 === 0) {
      const text = parts[i].trim();
      if (text) {
        text.split(/\n{2,}/).forEach((p, j) =>
          blocks.push(<p key={`p-${i}-${j}`} className="leading-7 text-foreground/90">{p}</p>)
        );
      }
    } else if (i % 3 === 1) {
      const lang = parts[i] || "tsx";
      const code = parts[i + 1];
      blocks.push(<CodeBlock key={`c-${i}`} code={code.trim()} language={lang} />);
      i++;
    }
  }
  return blocks;
}

export default function LessonView() {
  const { slug = "" } = useParams();
  const lesson = getLesson(slug);
  const { prev, next } = getAdjacentLessons(slug);
  const { completedSlugs, markComplete } = useProgress();

  if (!lesson) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Lesson not found</h1>
          <Button asChild className="mt-6"><Link to="/lessons">Back to lessons</Link></Button>
        </div>
      </Layout>
    );
  }

  const isDone = completedSlugs.has(slug);

  const handleComplete = async () => {
    await markComplete(slug);
    toast.success("Marked as complete!");
  };

  return (
    <Layout>
      <article className="container max-w-3xl py-10">
        <Link to="/lessons" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" /> All lessons
        </Link>
        <div className="mt-4 flex items-center gap-3">
          <Badge variant="secondary">{lesson.category}</Badge>
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {lesson.readTimeMinutes} min read
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mt-3">{lesson.title}</h1>
        <p className="text-muted-foreground mt-2">{lesson.excerpt}</p>

        <Separator className="my-8" />

        <div className="space-y-4 prose-base">
          {renderContent(lesson.content)}
        </div>

        <Separator className="my-10" />

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <Button onClick={handleComplete} variant={isDone ? "secondary" : "default"} disabled={isDone}>
            <Check className="h-4 w-4 mr-2" />
            {isDone ? "Completed" : "Mark as Complete"}
          </Button>
          <div className="flex gap-2">
            {prev && (
              <Button asChild variant="outline">
                <Link to={`/lessons/${prev.slug}`}><ArrowLeft className="h-4 w-4 mr-2" /> {prev.title}</Link>
              </Button>
            )}
            {next && (
              <Button asChild>
                <Link to={`/lessons/${next.slug}`}>{next.title} <ArrowRight className="h-4 w-4 ml-2" /></Link>
              </Button>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
}
