import { Layout } from "@/components/Layout";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, ArrowRight, Lightbulb, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const basicInterfaceCode = `// Basic Interface Definition
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;  // Optional property
  readonly created: Date;  // Read-only property
}

// Using the interface
const user: User = {
  id: 1,
  name: "Alice Johnson",
  email: "alice@example.com",
  created: new Date()
  // isActive is optional, so we can omit it
};

// Function using interface
function createUser(userData: Omit<User, 'id' | 'created'>): User {
  return {
    ...userData,
    id: Date.now(),
    created: new Date(),
    isActive: userData.isActive ?? true
  };
}`;

const extendingInterfacesCode = `// Base interface
interface Person {
  name: string;
  age: number;
}

// Extending interfaces
interface Employee extends Person {
  employeeId: string;
  department: string;
  salary: number;
}

interface Manager extends Employee {
  teamSize: number;
  directReports: Employee[];
}

// Multiple inheritance
interface Contactable {
  email: string;
  phone?: string;
}

interface Customer extends Person, Contactable {
  customerId: string;
  orders: Order[];
}

// Using extended interfaces
const manager: Manager = {
  name: "Sarah Wilson",
  age: 35,
  employeeId: "EMP001",
  department: "Engineering",
  salary: 95000,
  teamSize: 8,
  directReports: []
};`;

const interfaceMethodsCode = `// Interface with methods
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

// Implementing the interface
class BasicCalculator implements Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  }
}

// Interface for function signatures
interface EventHandler {
  (event: Event): void;
}

interface StringValidator {
  (input: string): boolean;
}

const emailValidator: StringValidator = (email) => {
  return email.includes("@");
};`;

const indexSignaturesCode = `// Index signatures for dynamic properties
interface StringDictionary {
  [key: string]: string;
}

interface NumberDictionary {
  [key: string]: number;
  length: number;    // OK, length is a number
  name: string;      // Error! Property 'name' must be of type number
}

// More flexible approach
interface FlexibleConfig {
  name: string;
  version: number;
  [key: string]: any;  // Allow any additional properties
}

const config: FlexibleConfig = {
  name: "MyApp",
  version: 1.0,
  debug: true,        // OK
  apiUrl: "https://api.example.com"  // OK
};

// Generic index signatures
interface KeyValuePair<T> {
  [key: string]: T;
}

const scores: KeyValuePair<number> = {
  alice: 95,
  bob: 87,
  charlie: 92
};`;

const practiceExercises = [
  {
    title: "User Profile Interface",
    description: "Create interfaces for a user management system",
    challenge: "Define interfaces for User, Profile, and Settings with proper optional and readonly properties.",
    solution: `interface User {
  readonly id: string;
  username: string;
  email: string;
  createdAt: Date;
}

interface Profile extends User {
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
}

interface Settings {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}`
  },
  {
    title: "API Response Interface",
    description: "Model API responses with interfaces",
    challenge: "Create interfaces for API responses that can handle success and error states.",
    solution: `interface ApiResponse<T> {
  success: boolean;
  timestamp: Date;
}

interface SuccessResponse<T> extends ApiResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse extends ApiResponse<never> {
  success: false;
  error: {
    code: string;
    message: string;
  };
}`
  }
];

const InterfacesPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="secondary">Beginner</Badge>
              <Badge variant="outline">20 min read</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Interfaces</h1>
            <p className="text-xl text-muted-foreground">
              Define contracts for objects and create reusable type definitions. 
              Learn how interfaces provide structure and consistency to your TypeScript code.
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
                  <span>Basic interface syntax and usage</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Optional and readonly properties</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Extending and composing interfaces</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Method signatures and function types</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Index signatures for dynamic properties</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-12">
            {/* Basic Interface Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Basic Interface Definition</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Interfaces are one of TypeScript's most powerful features. They allow you to define 
                contracts that describe the shape of objects, ensuring consistency across your codebase.
              </p>
              
              <CodeBlock 
                code={basicInterfaceCode}
                title="Basic Interface Examples"
                sandboxUrl="https://stackblitz.com/edit/typescript-interfaces-basic"
              />

              <Alert className="mt-6">
                <FileText className="h-4 w-4" />
                <AlertDescription>
                  <strong>Interface vs Type:</strong> While interfaces and type aliases can often be used interchangeably, 
                  interfaces are extendable and are generally preferred for object shapes.
                </AlertDescription>
              </Alert>
            </section>

            {/* Extending Interfaces Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Extending Interfaces</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Interfaces can extend other interfaces, allowing you to build complex types from simpler ones. 
                This promotes code reuse and maintains clear type hierarchies.
              </p>
              
              <CodeBlock 
                code={extendingInterfacesCode}
                title="Interface Inheritance"
                sandboxUrl="https://stackblitz.com/edit/typescript-interface-inheritance"
              />
            </section>

            {/* Methods and Functions Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Interface Methods & Function Types</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Interfaces can define method signatures, making them perfect for describing the contract 
                that classes or objects must implement.
              </p>
              
              <CodeBlock 
                code={interfaceMethodsCode}
                title="Interface Methods"
                sandboxUrl="https://stackblitz.com/edit/typescript-interface-methods"
              />
            </section>

            {/* Index Signatures Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Index Signatures</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Index signatures allow you to describe objects with dynamic properties, where you know 
                the type of values but not all the property names ahead of time.
              </p>
              
              <CodeBlock 
                code={indexSignaturesCode}
                title="Index Signatures"
                sandboxUrl="https://stackblitz.com/edit/typescript-index-signatures"
              />
            </section>

            {/* Practice Exercises */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Practice Exercises</h2>
              <p className="text-muted-foreground mb-6">
                Apply your interface knowledge with these practical exercises.
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
                    <CardTitle>Previous: Type Annotations</CardTitle>
                    <CardDescription>
                      Learn about TypeScript's type system fundamentals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/concepts/types">
                        ← Back to Types
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <CardTitle>Next: Classes & Inheritance</CardTitle>
                    <CardDescription>
                      Explore object-oriented programming with TypeScript
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full group-hover:translate-x-1 transition-transform">
                      <Link to="/concepts/classes">
                        Continue to Classes
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

export default InterfacesPage;