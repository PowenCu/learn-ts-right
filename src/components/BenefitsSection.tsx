import { Shield, Zap, Wrench, Users, Target, Rocket } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    icon: Shield,
    title: "Type Safety",
    description: "Catch errors at compile time, not runtime. Build more reliable applications with confidence.",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "Better IntelliSense",
    description: "Enhanced autocompletion, refactoring, and navigation in your favorite editor.",
    color: "text-accent"
  },
  {
    icon: Wrench,
    title: "Easy Refactoring",
    description: "Safely restructure large codebases with automated tools and type checking.",
    color: "text-success"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Self-documenting code that helps team members understand complex systems.",
    color: "text-info"
  },
  {
    icon: Target,
    title: "Modern JavaScript",
    description: "Use the latest ES features while maintaining compatibility with older environments.",
    color: "text-warning"
  },
  {
    icon: Rocket,
    title: "Better Performance",
    description: "Optimized transpilation and tree-shaking for smaller, faster applications.",
    color: "text-primary"
  }
];

export const BenefitsSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Choose TypeScript?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the powerful benefits that make TypeScript the preferred choice 
            for modern web development teams worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${benefit.color}`} />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};