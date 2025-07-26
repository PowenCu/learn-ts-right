import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, FileText, Layers, Zap, Package } from "lucide-react";
import { Link } from "react-router-dom";

const concepts = [
  {
    icon: Code,
    title: "Type Annotations",
    description: "Learn how to add types to variables, functions, and objects for better code safety.",
    path: "/concepts/types",
    difficulty: "Beginner",
    estimatedTime: "15 min"
  },
  {
    icon: FileText,
    title: "Interfaces",
    description: "Define contracts for objects and create reusable type definitions.",
    path: "/concepts/interfaces", 
    difficulty: "Beginner",
    estimatedTime: "20 min"
  },
  {
    icon: Layers,
    title: "Classes & Inheritance",
    description: "Object-oriented programming with TypeScript classes and inheritance patterns.",
    path: "/concepts/classes",
    difficulty: "Intermediate",
    estimatedTime: "25 min"
  },
  {
    icon: Zap,
    title: "Generics",
    description: "Create flexible, reusable components with TypeScript generics.",
    path: "/concepts/generics",
    difficulty: "Intermediate", 
    estimatedTime: "30 min"
  },
  {
    icon: Package,
    title: "Modules & Namespaces",
    description: "Organize code with modules, imports, exports, and namespaces.",
    path: "/concepts/modules",
    difficulty: "Intermediate",
    estimatedTime: "20 min"
  }
];

const Concepts = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Core TypeScript Concepts</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master the fundamental concepts that make TypeScript powerful. 
              Each lesson includes theory, examples, and hands-on practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {concepts.map((concept, index) => {
              const Icon = concept.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{concept.title}</CardTitle>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        concept.difficulty === 'Beginner' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {concept.difficulty}
                      </span>
                    </div>
                    <CardDescription>{concept.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {concept.estimatedTime}
                      </span>
                      <Button asChild variant="ghost" className="group-hover:translate-x-1 transition-transform">
                        <Link to={concept.path}>
                          Start Learning
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Ready for Advanced Topics?</CardTitle>
                <CardDescription className="text-lg">
                  Once you've mastered the core concepts, explore advanced TypeScript patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild size="lg">
                  <Link to="/advanced">
                    Explore Advanced Topics
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Concepts;