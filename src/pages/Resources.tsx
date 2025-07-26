import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Video, Users, FileText } from "lucide-react";

const resources = [
  {
    category: "Official Documentation",
    icon: FileText,
    items: [
      {
        title: "TypeScript Handbook",
        description: "The official TypeScript documentation and reference guide.",
        url: "https://www.typescriptlang.org/docs/",
        type: "Documentation"
      },
      {
        title: "TypeScript Playground",
        description: "Interactive online editor for experimenting with TypeScript.",
        url: "https://www.typescriptlang.org/play",
        type: "Tool"
      }
    ]
  },
  {
    category: "Learning Resources",
    icon: BookOpen,
    items: [
      {
        title: "TypeScript Deep Dive",
        description: "Free online book covering TypeScript in great detail.",
        url: "https://basarat.gitbook.io/typescript/",
        type: "Book"
      },
      {
        title: "Execute Program - TypeScript",
        description: "Interactive TypeScript course with spaced repetition.",
        url: "https://www.executeprogram.com/courses/typescript",
        type: "Course"
      }
    ]
  },
  {
    category: "Video Tutorials",
    icon: Video,
    items: [
      {
        title: "TypeScript Course by Academind",
        description: "Comprehensive video course covering TypeScript basics to advanced.",
        url: "https://www.youtube.com/watch?v=BwuLxPH8IDs",
        type: "Video"
      },
      {
        title: "TypeScript Crash Course",
        description: "Quick introduction to TypeScript fundamentals.",
        url: "https://www.youtube.com/watch?v=d56mG7DezGs",
        type: "Video"
      }
    ]
  },
  {
    category: "Community",
    icon: Users,
    items: [
      {
        title: "TypeScript GitHub",
        description: "Official TypeScript repository and issue tracker.",
        url: "https://github.com/microsoft/TypeScript",
        type: "GitHub"
      },
      {
        title: "r/typescript",
        description: "TypeScript community on Reddit for discussions and help.",
        url: "https://www.reddit.com/r/typescript/",
        type: "Community"
      }
    ]
  }
];

const Resources = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">TypeScript Resources</h1>
            <p className="text-xl text-muted-foreground">
              Curated collection of books, courses, tools, and communities to continue your TypeScript journey.
            </p>
          </div>

          <div className="space-y-12">
            {resources.map((section, sectionIndex) => {
              const Icon = section.icon;
              return (
                <section key={sectionIndex}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold">{section.category}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.items.map((item, itemIndex) => (
                      <Card key={itemIndex} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                              {item.type}
                            </span>
                          </div>
                          <CardDescription>{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" asChild className="w-full">
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-center"
                            >
                              Visit Resource
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <div className="mt-16">
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Keep Learning!</CardTitle>
                <CardDescription className="text-lg">
                  The TypeScript ecosystem is constantly evolving. Stay updated with the latest features and best practices.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild size="lg">
                  <a 
                    href="https://devblogs.microsoft.com/typescript/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    TypeScript Blog
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;