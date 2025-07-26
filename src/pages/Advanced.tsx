import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Layers } from "lucide-react";

const advancedTopics = [
  {
    icon: Zap,
    title: "Union & Intersection Types",
    description: "Advanced type combinations and type manipulation techniques.",
    difficulty: "Advanced",
    estimatedTime: "25 min"
  },
  {
    icon: Shield,
    title: "Type Guards & Assertions",
    description: "Runtime type checking and type narrowing strategies.",
    difficulty: "Advanced", 
    estimatedTime: "20 min"
  },
  {
    icon: Layers,
    title: "Decorators",
    description: "Metadata programming with TypeScript decorators.",
    difficulty: "Expert",
    estimatedTime: "30 min"
  }
];

const Advanced = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Advanced TypeScript Topics</h1>
            <p className="text-xl text-muted-foreground">
              Explore advanced patterns and techniques for expert TypeScript development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{topic.title}</CardTitle>
                      <span className="text-xs px-2 py-1 rounded-full bg-destructive/10 text-destructive">
                        {topic.difficulty}
                      </span>
                    </div>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {topic.estimatedTime}
                      </span>
                      <Button variant="ghost" size="sm">
                        Coming Soon
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Advanced;