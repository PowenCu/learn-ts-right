import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/CodeBlock";
import { TableOfContents } from "@/components/TableOfContents";
import { FeedbackForm } from "@/components/FeedbackForm";
import { ArrowLeft, ArrowRight, Check, Clock } from "lucide-react";
import { getAdjacentLessons, getLesson } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import { toast } from "sonner";

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

interface RenderResult {
  blocks: React.ReactNode[];
  headings: { id: string; text: string }[];
}

function renderContent(content: string): RenderResult {
  const blocks: React.ReactNode[] = [];
  const headings: { id: string; text: string }[] = [];
  // Split out fenced code blocks first
  const segments = content.split(/```(\w*)\n([\s\S]*?)```/g);
  for (let i = 0; i < segments.length; i++) {
    if (i % 3 === 0) {
      const text = segments[i];
      // Process headings + paragraphs
      const lines = text.split(/\n/);
      let buffer: string[] = [];
      const flush = (key: string) => {
        const para = buffer.join("\n").trim();
        if (para) {
          blocks.push(<p key={key} className="leading-7 text-foreground/90">{para}</p>);
        }
        buffer = [];
      };
      lines.forEach((line, j) => {
        const h = line.match(/^##\s+(.+)$/);
        if (h) {
          flush(`p-${i}-${j}`);
          const id = slugify(h[1]);
          headings.push({ id, text: h[1] });
          blocks.push(
            <h2 key={`h-${i}-${j}`} id={id} className="text-xl font-semibold mt-8 mb-2 scroll-mt-24">
              {h[1]}
            </h2>
          );
        } else {
          buffer.push(line);
        }
      });
      flush(`p-${i}-end`);
    } else if (i % 3 === 1) {
      const lang = segments[i] || "tsx";
      const code = segments[i + 1];
      blocks.push(<CodeBlock key={`c-${i}`} code={code.trim()} language={lang} />);
      i++;
    }
  }
  return { blocks, headings };
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

  const { blocks, headings } = renderContent(lesson.content);
  const tocHeadings = [...headings, { id: "feedback", text: "Feedback" }];
  const isDone = completedSlugs.has(slug);

  const handleComplete = async () => {
    await markComplete(slug);
    toast.success("Marked as complete!");
  };

  return (
    <Layout>
      <div className="container py-10 grid lg:grid-cols-[1fr_200px] gap-10 max-w-5xl">
        <article>
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

          <div className="space-y-4">{blocks}</div>

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

          <FeedbackForm lessonSlug={slug} />
        </article>

        <TableOfContents headings={tocHeadings} />
      </div>
    </Layout>
  );
}
