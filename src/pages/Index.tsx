import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Boxes, Wrench, Atom, ArrowRight } from "lucide-react";
import { lessons } from "@/data/lessons";

const features = [
  { icon: Sparkles, title: "Type System Fundamentals", desc: "Master primitives, unions, intersections, and inference." },
  { icon: Boxes, title: "Generics & Advanced Types", desc: "Write reusable, fully-typed code with confidence." },
  { icon: Wrench, title: "Real-World Patterns", desc: "Discriminated unions, type guards, and module design." },
  { icon: Atom, title: "TypeScript with React", desc: "Type props, hooks, and components the right way." },
];

const tiers = [
  { label: "Beginner", desc: "Get comfortable with types", count: lessons.filter(l => ["Basics","Types"].includes(l.category)).length },
  { label: "Intermediate", desc: "Functions, generics & React", count: lessons.filter(l => ["Functions","Generics","React"].includes(l.category)).length },
  { label: "Advanced", desc: "Patterns & tooling", count: lessons.filter(l => l.category === "Advanced").length },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="container py-20 md:py-28 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
          Learn TypeScript The Right Way
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Structured lessons, live examples, and progress tracking — all in one place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" style={{ background: "var(--gradient-primary)" }} className="text-primary-foreground border-0">
            <Link to="/lessons">Start Learning <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/playground">Try Playground</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">What you'll learn</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <Card key={f.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg flex items-center justify-center mb-2" style={{ background: "var(--gradient-primary)" }}>
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Curriculum roadmap</h2>
        <div className="relative grid md:grid-cols-3 gap-6">
          <div className="hidden md:block absolute top-1/2 left-[16.66%] right-[16.66%] h-0.5 -translate-y-1/2" style={{ background: "var(--gradient-primary)" }} />
          {tiers.map((t, i) => (
            <div key={t.label} className="relative bg-card border rounded-xl p-6 text-center">
              <div className="mx-auto h-12 w-12 rounded-full flex items-center justify-center mb-4 text-primary-foreground font-bold" style={{ background: "var(--gradient-primary)" }}>
                {i + 1}
              </div>
              <h3 className="font-semibold text-lg">{t.label}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
              <p className="text-xs mt-3 text-muted-foreground">{t.count} lesson{t.count === 1 ? "" : "s"}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
