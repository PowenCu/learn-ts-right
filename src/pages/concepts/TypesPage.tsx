import { Layout } from "@/components/Layout";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertTriangle, ArrowRight, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const basicTypesCode = `// Primitive Types
let message: string = "Hello, TypeScript!";
let count: number = 42;
let isActive: boolean = true;
let value: null = null;
let data: undefined = undefined;

// Arrays
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["Alice", "Bob", "Charlie"];

// Tuples - fixed length arrays with specific types
let coordinates: [number, number] = [10, 20];
let person: [string, number, boolean] = ["John", 30, true];

// Enums
enum Color {
  Red = "red",
  Green = "green", 
  Blue = "blue"
}
let favoriteColor: Color = Color.Blue;

// Any and Unknown
let anything: any = "could be anything";
let mystery: unknown = "safer than any";`;

const functionTypesCode = `// Function Parameter and Return Types
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

function add(a: number, b: number): number {
  return a + b;
}

// Optional Parameters
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return \`\${firstName} \${lastName}\`;
  }
  return firstName;
}

// Default Parameters
function createUser(name: string, age: number = 25): object {
  return { name, age };
}

// Rest Parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// Function Types
type Calculator = (x: number, y: number) => number;

const multiply: Calculator = (x, y) => x * y;
const divide: Calculator = (x, y) => x / y;`;

const unionTypesCode = `// Union Types - value can be one of several types
let id: string | number;
id = "abc123";  // ✅ Valid
id = 12345;     // ✅ Valid
// id = true;   // ❌ Error: boolean is not assignable

// Literal Types
type Size = "small" | "medium" | "large";
type Status = "pending" | "approved" | "rejected";

let shirtSize: Size = "medium";
let orderStatus: Status = "pending";

// Type Guards for Union Types
function processId(id: string | number): string {
  if (typeof id === "string") {
    return id.toUpperCase();  // TypeScript knows id is string here
  } else {
    return id.toString();     // TypeScript knows id is number here
  }
}

// More Complex Union Types
type LoadingState = 
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; error: string };

function handleState(state: LoadingState) {
  switch (state.status) {
    case "loading":
      console.log("Loading...");
      break;
    case "success":
      console.log("Data:", state.data); // TypeScript knows data exists
      break;
    case "error":
      console.log("Error:", state.error); // TypeScript knows error exists
      break;
  }
}`;

const objectTypesCode = `// Object Type Annotations
let user: {
  name: string;
  age: number;
  email?: string;  // Optional property
} = {
  name: "Alice",
  age: 30
};

// Nested Objects
type Address = {
  street: string;
  city: string;
  zipCode: string;
};

type Customer = {
  id: number;
  name: string;
  address: Address;
  orders: number[];
};

const customer: Customer = {
  id: 1,
  name: "John Doe",
  address: {
    street: "123 Main St",
    city: "Anytown",
    zipCode: "12345"
  },
  orders: [101, 102, 103]
};

// Index Signatures - for dynamic properties
type Dictionary = {
  [key: string]: string;
};

const translations: Dictionary = {
  hello: "hola",
  goodbye: "adiós",
  thank_you: "gracias"
};`;

const practiceExercises = [
  {
    title: "Basic Type Exercise",
    description: "Create variables with correct type annotations",
    challenge: "Declare variables for a student's name, age, GPA, and enrolled status with proper types.",
    solution: `let studentName: string = "Alice";
let age: number = 20;
let gpa: number = 3.8;
let isEnrolled: boolean = true;`
  },
  {
    title: "Function Types Challenge",
    description: "Build a type-safe calculator function",
    challenge: "Create a function that takes two numbers and an operation string, returns a number.",
    solution: `function calculate(a: number, b: number, operation: string): number {
  switch (operation) {
    case "add": return a + b;
    case "subtract": return a - b;
    case "multiply": return a * b;
    case "divide": return a / b;
    default: throw new Error("Invalid operation");
  }
}`
  }
];

const TypesPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="secondary">Beginner</Badge>
              <Badge variant="outline">15 min read</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Type Annotations</h1>
            <p className="text-xl text-muted-foreground">
              Master TypeScript's type system to write safer, more predictable code. 
              Learn how to annotate variables, functions, and objects with types.
            </p>
          </div>

          {/* Learning Objectives */}
          <Card className="mb-8 border-primary/20 bg-primary/5 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <span>What You'll Learn</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Basic primitive types (string, number, boolean)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Array and tuple types</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Function parameter and return types</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Union types and type guards</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Object type annotations</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-12">
            {/* Basic Types Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Basic Types</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                TypeScript includes all JavaScript types plus additional ones for better type safety. 
                Here are the fundamental types you'll use most often:
              </p>
              
              <CodeBlock 
                code={basicTypesCode}
                title="Basic Type Examples"
                sandboxUrl="https://stackblitz.com/edit/typescript-basic-types"
              />

              <Alert className="mt-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Pro Tip:</strong> Use <code className="bg-muted px-1 rounded">unknown</code> instead of <code className="bg-muted px-1 rounded">any</code> when possible. 
                  It's type-safe and forces you to check the type before using the value.
                </AlertDescription>
              </Alert>
            </section>

            {/* Function Types Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Function Types</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Functions are the building blocks of any application. TypeScript lets you specify 
                the types of parameters and return values, making your functions predictable and safe.
              </p>
              
              <CodeBlock 
                code={functionTypesCode}
                title="Function Type Examples"
                sandboxUrl="https://stackblitz.com/edit/typescript-function-types"
              />
            </section>

            {/* Union Types Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Union Types & Type Guards</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Union types allow a value to be one of several types, providing flexibility while 
                maintaining type safety. Type guards help TypeScript understand which specific type you're working with.
              </p>
              
              <CodeBlock 
                code={unionTypesCode}
                title="Union Types & Type Guards"
                sandboxUrl="https://stackblitz.com/edit/typescript-union-types"
              />
            </section>

            {/* Object Types Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Object Types</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Objects are everywhere in JavaScript. TypeScript allows you to define the exact shape 
                of objects, ensuring they have the right properties with the right types.
              </p>
              
              <CodeBlock 
                code={objectTypesCode}
                title="Object Type Examples"
                sandboxUrl="https://stackblitz.com/edit/typescript-object-types"
              />
            </section>

            {/* Practice Exercises */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Practice Exercises</h2>
              <p className="text-muted-foreground mb-6">
                Test your understanding with these hands-on exercises.
              </p>

              <Tabs defaultValue="exercise-0" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  {practiceExercises.map((_, index) => (
                    <TabsTrigger key={index} value={`exercise-${index}`}>
                      Exercise {index + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {practiceExercises.map((exercise, index) => (
                  <TabsContent key={index} value={`exercise-${index}`}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{exercise.title}</CardTitle>
                        <CardDescription>{exercise.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="font-medium mb-2">Challenge:</p>
                          <p className="text-sm">{exercise.challenge}</p>
                        </div>
                        <details className="group">
                          <summary className="cursor-pointer text-sm text-primary hover:underline">
                            Show Solution
                          </summary>
                          <div className="mt-2">
                            <CodeBlock 
                              code={exercise.solution}
                              title="Solution"
                            />
                          </div>
                        </details>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </section>

            {/* Navigation */}
            <section className="border-t pt-12 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Previous: Getting Started</CardTitle>
                    <CardDescription>
                      Set up your TypeScript development environment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/getting-started">
                        ← Back to Setup
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <CardTitle>Next: Interfaces</CardTitle>
                    <CardDescription>
                      Learn how to define object contracts with interfaces
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full group-hover:translate-x-1 transition-transform">
                      <Link to="/concepts/interfaces">
                        Continue to Interfaces
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
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

export default TypesPage;