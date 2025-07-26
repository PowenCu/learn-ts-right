import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { CheckCircle, Download, Settings, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const installCode = `# Install TypeScript globally
npm install -g typescript

# Or install locally in your project
npm install --save-dev typescript`;

const tsconfigCode = `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`;

const helloWorldCode = `// src/hello.ts
function greetUser(name: string): string {
  return \`Hello, \${name}! Welcome to TypeScript.\`;
}

const userName: string = "Developer";
const message: string = greetUser(userName);

console.log(message);`;

const steps = [
  {
    icon: Download,
    title: "Install TypeScript",
    description: "Get TypeScript installed on your system"
  },
  {
    icon: Settings,
    title: "Configure Project",
    description: "Set up tsconfig.json for your project"
  },
  {
    icon: Play,
    title: "Write Your First Code",
    description: "Create and compile your first TypeScript file"
  },
  {
    icon: CheckCircle,
    title: "Run and Test",
    description: "Compile and execute your TypeScript code"
  }
];

const GettingStarted = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Getting Started with TypeScript</h1>
            <p className="text-xl text-muted-foreground">
              Set up your development environment and write your first TypeScript code
            </p>
          </div>

          {/* Progress Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{step.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="space-y-12">
            {/* Step 1: Installation */}
            <section>
              <h2 className="text-3xl font-semibold mb-6">1. Install TypeScript</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  TypeScript can be installed globally on your system or locally in your project. 
                  We recommend starting with a global installation for learning purposes.
                </p>
                <CodeBlock 
                  code={installCode}
                  language="bash"
                  title="Installation Commands"
                />
                <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                  <p className="text-sm text-info-foreground">
                    <strong>Note:</strong> Make sure you have Node.js installed on your system before installing TypeScript.
                  </p>
                </div>
              </div>
            </section>

            {/* Step 2: Configuration */}
            <section>
              <h2 className="text-3xl font-semibold mb-6">2. Configure Your Project</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Create a <code className="bg-muted px-2 py-1 rounded text-sm">tsconfig.json</code> file 
                  to configure TypeScript compiler options for your project.
                </p>
                <CodeBlock 
                  code={tsconfigCode}
                  language="json"
                  title="Basic tsconfig.json"
                  filename="tsconfig.json"
                />
              </div>
            </section>

            {/* Step 3: First Code */}
            <section>
              <h2 className="text-3xl font-semibold mb-6">3. Write Your First TypeScript Code</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Let's create a simple TypeScript file with type annotations to see the benefits in action.
                </p>
                <CodeBlock 
                  code={helloWorldCode}
                  title="Hello TypeScript"
                  filename="src/hello.ts"
                  sandboxUrl="https://stackblitz.com/edit/typescript-hello-world"
                />
              </div>
            </section>

            {/* Step 4: Compile and Run */}
            <section>
              <h2 className="text-3xl font-semibold mb-6">4. Compile and Run</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Use the TypeScript compiler to convert your TypeScript code into JavaScript.
                </p>
                <CodeBlock 
                  code={`# Compile the TypeScript file
tsc src/hello.ts

# Run the compiled JavaScript
node src/hello.js`}
                  language="bash"
                  title="Compilation Commands"
                />
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <p className="text-sm text-success-foreground">
                    <strong>Success!</strong> You should see "Hello, Developer! Welcome to TypeScript." in your terminal.
                  </p>
                </div>
              </div>
            </section>

            {/* Next Steps */}
            <section className="border-t pt-12">
              <h2 className="text-3xl font-semibold mb-6">What's Next?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learn Core Concepts</CardTitle>
                    <CardDescription>
                      Dive into TypeScript's type system and fundamental concepts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <a href="/concepts">Start Learning</a>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Interactive Examples</CardTitle>
                    <CardDescription>
                      Practice with hands-on code examples and challenges
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" asChild className="w-full">
                      <a href="/concepts/types">Try Examples</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GettingStarted;