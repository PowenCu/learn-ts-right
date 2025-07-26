import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ExternalLink, BookOpen, ArrowRight } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

const quickStartCode = `// Install TypeScript globally
npm install -g typescript

// Create a new TypeScript file
echo 'console.log("Hello, TypeScript!");' > hello.ts

// Compile and run
tsc hello.ts
node hello.js`;

export const QuickStartSection = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Start Learning Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get up and running with TypeScript in minutes. Follow our structured learning path 
            from basic setup to advanced patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Quick Setup */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Quick Setup</h3>
            <CodeBlock 
              code={quickStartCode}
              language="bash"
              title="Get Started in 3 Steps"
            />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link to="/getting-started">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Full Setup Guide
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a 
                  href="https://stackblitz.com/fork/typescript" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Try Online
                </a>
              </Button>
            </div>
          </div>

          {/* Learning Path */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Learning Path</h3>
            
            <div className="space-y-4">
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">1. Fundamentals</CardTitle>
                  <CardDescription>
                    Type annotations, interfaces, and basic configurations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
                    <Link to="/concepts/types" className="flex items-center">
                      Start with Types
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">2. Object-Oriented</CardTitle>
                  <CardDescription>
                    Classes, inheritance, and advanced object patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
                    <Link to="/concepts/classes" className="flex items-center">
                      Learn Classes
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-success">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">3. Advanced Topics</CardTitle>
                  <CardDescription>
                    Generics, decorators, and complex type patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" asChild className="p-0 h-auto">
                    <Link to="/advanced/generics" className="flex items-center">
                      Explore Generics
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};