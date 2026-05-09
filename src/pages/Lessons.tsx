import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock, Clock } from "lucide-react";
import { CATEGORIES, lessons, type LessonCategory } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";

type Filter = "All" | LessonCategory;

export default function Lessons() {
  const [filter, setFilter] = useState<Filter>("All");
  const { completedSlugs } = useProgress();
  const { user } = useAuth();

  const filtered = filter === "All" ? lessons : lessons.filter((l) => l.category === filter);
  const sorted = [...filtered].sort((a, b) => a.order - b.order);

  return (
    <Layout>
      <div className="container py-10 grid md:grid-cols-[200px_1fr] gap-8">
        <aside>
          <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Categories</h3>
          <div className="flex md:flex-col gap-2 flex-wrap">
            {(["All", ...CATEGORIES] as Filter[]).map((c) => (
              <Button
                key={c}
                variant={filter === c ? "default" : "ghost"}
                size="sm"
                className="md:justify-start md:w-full"
                onClick={() => setFilter(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </aside>

        <section>
          <h1 className="text-3xl font-bold mb-2">Lessons</h1>
          <p className="text-muted-foreground mb-6">{sorted.length} lesson{sorted.length === 1 ? "" : "s"}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {sorted.map((l) => {
              const done = completedSlugs.has(l.slug);
              const locked = !user && !done;
              return (
                <Link key={l.id} to={`/lessons/${l.slug}`}>
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{l.category}</Badge>
                        {done ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : locked ? (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        ) : null}
                      </div>
                      <CardTitle className="text-base mt-2">{l.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{l.excerpt}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-3">
                        <Clock className="h-3 w-3" /> {l.readTimeMinutes} min read
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </Layout>
  );
}
