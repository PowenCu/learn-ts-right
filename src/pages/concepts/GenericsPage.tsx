import { Layout } from "@/components/Layout";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, ArrowRight, Lightbulb, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const basicGenericsCode = `// Generic Functions
function identity<T>(arg: T): T {
  return arg;
}

// Usage with explicit type
const stringResult = identity<string>("Hello, TypeScript!");
const numberResult = identity<number>(42);

// Type inference - TypeScript can figure out the type
const boolResult = identity(true); // T is inferred as boolean
const arrayResult = identity([1, 2, 3]); // T is inferred as number[]

// Generic function with constraints
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length; // OK, we know T has a length property
}

console.log(getLength("Hello")); // 5
console.log(getLength([1, 2, 3, 4])); // 4
// console.log(getLength(123)); // Error: number doesn't have length

// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const nameAge = pair("Alice", 30); // [string, number]
const coords = pair(10, 20); // [number, number]`;

const genericInterfacesCode = `// Generic Interfaces
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

// Implementing generic interface
class Box<T> implements Container<T> {
  constructor(public value: T) {}
  
  getValue(): T {
    return this.value;
  }
  
  setValue(value: T): void {
    this.value = value;
  }
}

// Usage with different types
const stringBox = new Box<string>("TypeScript");
const numberBox = new Box<number>(100);
const booleanBox = new Box<boolean>(true);

// Generic interface with multiple parameters
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

// Array of key-value pairs
const settings: KeyValuePair<string, any>[] = [
  { key: "theme", value: "dark" },
  { key: "fontSize", value: 14 },
  { key: "autoSave", value: true }
];

// Generic interface extending other interfaces
interface Comparable<T> {
  compareTo(other: T): number;
}

interface Sortable<T> extends Comparable<T> {
  sort(): T[];
}`;

const genericClassesCode = `// Generic Classes
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  toArray(): T[] {
    return [...this.items];
  }
}

// Usage
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log(numberStack.pop()); // 3

const stringStack = new Stack<string>();
stringStack.push("first");
stringStack.push("second");
console.log(stringStack.peek()); // "second"

// Generic class with constraints
class Repository<T extends { id: string }> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: string): T | undefined {
    return this.items.find(item => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }

  remove(id: string): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}`;

const advancedGenericsCode = `// Conditional Types with Generics
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };

const stringResponse: ApiResponse<string> = { message: "Success" };
const objectResponse: ApiResponse<{ id: number }> = { data: { id: 1 } };

// Mapped Types with Generics
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Utility Types in Action
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Make all properties optional
type PartialUser = Partial<User>;

// Pick specific properties
type UserSummary = Pick<User, 'id' | 'name'>;

// Omit specific properties
type CreateUser = Omit<User, 'id'>;

// Generic utility function
function updateEntity<T extends { id: string }>(
  entity: T, 
  updates: Partial<Omit<T, 'id'>>
): T {
  return { ...entity, ...updates };
}

// Higher-order function with generics
function createValidator<T>(
  validationFn: (value: T) => boolean
): (value: T) => { isValid: boolean; value: T } {
  return (value: T) => ({
    isValid: validationFn(value),
    value
  });
}

const emailValidator = createValidator<string>(
  email => email.includes("@")
);

const ageValidator = createValidator<number>(
  age => age >= 0 && age <= 120
);`;

const practiceExercises = [
  {
    title: "Generic Collection",
    description: "Build a flexible collection class with generics",
    challenge: "Create a generic Collection class that can store any type of items with add, remove, find, and filter methods.",
    solution: `class Collection<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(predicate: (item: T) => boolean): T | undefined {
    const index = this.items.findIndex(predicate);
    if (index !== -1) {
      return this.items.splice(index, 1)[0];
    }
    return undefined;
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }

  filter(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  getAll(): T[] {
    return [...this.items];
  }

  size(): number {
    return this.items.length;
  }
}`
  },
  {
    title: "Generic API Client",
    description: "Create a type-safe API client using generics",
    challenge: "Build an API client that can handle different response types while maintaining type safety.",
    solution: `interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(\`\${this.baseUrl}\${endpoint}\`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async post<T, U>(endpoint: string, body: T): Promise<ApiResponse<U>> {
    try {
      const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}`
  }
];

const GenericsPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="secondary">Intermediate</Badge>
              <Badge variant="outline">30 min read</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Generics</h1>
            <p className="text-xl text-muted-foreground">
              Master TypeScript generics to create flexible, reusable components that work with multiple types 
              while maintaining type safety and code clarity.
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
                  <span>Generic function syntax and type inference</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Generic interfaces and classes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Generic constraints and bounded types</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Conditional and mapped types</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Built-in utility types</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-12">
            {/* Basic Generics Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Generic Functions</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Generics allow you to write flexible functions and classes that work with multiple types 
                while preserving type information. They're like type variables that get filled in when you use them.
              </p>
              
              <CodeBlock 
                code={basicGenericsCode}
                title="Basic Generic Functions"
                sandboxUrl="https://stackblitz.com/edit/typescript-generic-functions"
              />

              <Alert className="mt-6">
                <Zap className="h-4 w-4" />
                <AlertDescription>
                  <strong>Type Inference:</strong> TypeScript can often infer generic types automatically, 
                  so you don't always need to specify them explicitly. Use explicit types when you need more control.
                </AlertDescription>
              </Alert>
            </section>

            {/* Generic Interfaces Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Generic Interfaces</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Generic interfaces let you define contracts that work with multiple types. They're perfect 
                for creating reusable API definitions and data structures.
              </p>
              
              <CodeBlock 
                code={genericInterfacesCode}
                title="Generic Interface Examples"
                sandboxUrl="https://stackblitz.com/edit/typescript-generic-interfaces"
              />
            </section>

            {/* Generic Classes Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Generic Classes</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Generic classes enable you to create data structures and utilities that work with any type 
                while maintaining type safety throughout the class methods.
              </p>
              
              <CodeBlock 
                code={genericClassesCode}
                title="Generic Class Examples"
                sandboxUrl="https://stackblitz.com/edit/typescript-generic-classes"
              />
            </section>

            {/* Advanced Generics Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Advanced Generic Patterns</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Explore advanced generic patterns including conditional types, mapped types, and utility types 
                that make TypeScript's type system incredibly powerful.
              </p>
              
              <CodeBlock 
                code={advancedGenericsCode}
                title="Advanced Generic Patterns"
                sandboxUrl="https://stackblitz.com/edit/typescript-advanced-generics"
              />
            </section>

            {/* Practice Exercises */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Practice Exercises</h2>
              <p className="text-muted-foreground mb-6">
                Build real-world components using generics to solidify your understanding.
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
                    <CardTitle>Previous: Classes & Inheritance</CardTitle>
                    <CardDescription>
                      Learn about object-oriented programming in TypeScript
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/concepts/classes">
                        ← Back to Classes
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <CardTitle>Next: Modules & Namespaces</CardTitle>
                    <CardDescription>
                      Organize your code with modules and namespaces
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full group-hover:translate-x-1 transition-transform">
                      <Link to="/concepts/modules">
                        Continue to Modules
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

export default GenericsPage;