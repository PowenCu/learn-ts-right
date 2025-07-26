import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Play } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted/30">
      <div className="container py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-primary/10 text-primary">
                <Code2 className="h-4 w-4 mr-2" />
                Learn TypeScript
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Master{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  TypeScript
                </span>{" "}
                with Confidence
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Transform your JavaScript skills into type-safe, scalable applications. 
                Learn through interactive examples and hands-on projects.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group">
                <Link to="/getting-started">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/concepts">
                  <Play className="mr-2 h-4 w-4" />
                  View Examples
                </Link>
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Interactive Examples</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Beginner Friendly</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Real Projects</span>
              </div>
            </div>
          </div>

          {/* Code Preview */}
          <div className="relative">
            <div className="bg-code rounded-lg p-6 shadow-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-code-foreground/60 text-sm ml-4">app.ts</span>
              </div>
              <pre className="text-code-foreground font-mono text-sm leading-relaxed">
                <code>
{`interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(data: User): User {
  return {
    ...data,
    id: Date.now()
  };
}

const newUser = createUser({
  name: "Alice",
  email: "alice@example.com"
});`}
                </code>
              </pre>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-success text-white px-3 py-1 rounded-full text-sm font-medium">
              Type Safe
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              IntelliSense Ready
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};