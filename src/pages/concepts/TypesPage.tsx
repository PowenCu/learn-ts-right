import { Layout } from "@/components/Layout";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const basicTypesCode = `// Basic Types in TypeScript
let message: string = "Hello, TypeScript!";
let count: number = 42;
let isActive: boolean = true;
let items: string[] = ["apple", "banana", "orange"];
let coordinates: [number, number] = [10, 20];

// Function with typed parameters and return type
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`;

const unionTypesCode = `// Union Types - variable can be one of several types
let id: string | number;
id = "abc123";  // ✅ Valid
id = 12345;     // ✅ Valid

// Type Guards
function processId(id: string | number) {
  if (typeof id === "string") {
    return id.toUpperCase();  // TypeScript knows id is string here
  } else {
    return id.toString();     // TypeScript knows id is number here
  }
}`;

const TypesPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Type Annotations</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to add type safety to your JavaScript code with TypeScript's type system.
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-semibold mb-4">Basic Types</h2>
              <p className="text-muted-foreground mb-6">
                TypeScript includes all JavaScript types plus additional ones for better type safety.
              </p>
              <CodeBlock 
                code={basicTypesCode}
                title="Basic Type Examples"
                sandboxUrl="https://stackblitz.com/edit/typescript-basic-types"
              />
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-4">Union Types</h2>
              <p className="text-muted-foreground mb-6">
                Union types allow a value to be one of several types, providing flexibility while maintaining safety.
              </p>
              <CodeBlock 
                code={unionTypesCode}
                title="Union Types & Type Guards"
                sandboxUrl="https://stackblitz.com/edit/typescript-union-types"
              />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Exercise</CardTitle>
                  <CardDescription>
                    Try creating a function that accepts both string and number inputs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Challenge: Create a function that formats currency, accepting both number and string inputs.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Next: Interfaces</CardTitle>
                  <CardDescription>
                    Learn how to define object shapes with interfaces
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a href="/concepts/interfaces" className="text-primary hover:underline">
                    Continue Learning →
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TypesPage;