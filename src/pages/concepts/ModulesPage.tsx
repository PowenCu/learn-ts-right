import { Layout } from "@/components/Layout";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, ArrowRight, Lightbulb, Package } from "lucide-react";
import { Link } from "react-router-dom";

const moduleBasicsCode = `// math.ts - Module with named exports
export const PI = 3.14159;
export const E = 2.71828;

export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function calculateCircleArea(radius: number): number {
  return PI * radius * radius;
}

// Default export
export default class Calculator {
  static add = add;
  static multiply = multiply;
  
  static power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }
}

// app.ts - Importing from modules
import Calculator, { add, multiply, PI } from './math';
import { calculateCircleArea } from './math';

// Using named imports
const sum = add(5, 3);
const product = multiply(4, 7);
const area = calculateCircleArea(5);

// Using default import
const powerResult = Calculator.power(2, 8);

// Import everything as namespace
import * as MathUtils from './math';
console.log(MathUtils.PI);
console.log(MathUtils.add(1, 2));`;

const modulePatternCode = `// types.ts - Type-only exports
export interface User {
  id: string;
  name: string;
  email: string;
}

export type UserRole = 'admin' | 'user' | 'moderator';

export interface CreateUserRequest {
  name: string;
  email: string;
  role: UserRole;
}

// services/userService.ts - Service module
import { User, UserRole, CreateUserRequest } from '../types';

class UserService {
  private users: User[] = [];

  createUser(request: CreateUserRequest): User {
    const newUser: User = {
      id: this.generateId(),
      ...request
    };
    this.users.push(newUser);
    return newUser;
  }

  findUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}

export default UserService;

// utils/validation.ts - Utility functions
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

// Re-export pattern
export { isValidEmail as validateEmail };`;

const namespacesCode = `// Legacy namespace pattern (less common in modern TypeScript)
namespace Geometry {
  export interface Point {
    x: number;
    y: number;
  }

  export interface Rectangle {
    topLeft: Point;
    width: number;
    height: number;
  }

  export function distance(p1: Point, p2: Point): number {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  export function area(rect: Rectangle): number {
    return rect.width * rect.height;
  }

  // Nested namespace
  export namespace Circle {
    export interface CircleShape {
      center: Point;
      radius: number;
    }

    export function area(circle: CircleShape): number {
      return Math.PI * circle.radius * circle.radius;
    }

    export function circumference(circle: CircleShape): number {
      return 2 * Math.PI * circle.radius;
    }
  }
}

// Using namespaces
const point1: Geometry.Point = { x: 0, y: 0 };
const point2: Geometry.Point = { x: 3, y: 4 };
const dist = Geometry.distance(point1, point2);

const circle: Geometry.Circle.CircleShape = {
  center: { x: 0, y: 0 },
  radius: 5
};
const circleArea = Geometry.Circle.area(circle);`;

const moduleResolutionCode = `// config/database.ts
interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export const dbConfig: DatabaseConfig = {
  host: 'localhost',
  port: 5432,
  database: 'myapp',
  username: 'admin',
  password: 'secret'
};

// config/index.ts - Barrel export
export { dbConfig } from './database';
export { apiConfig } from './api';
export { loggerConfig } from './logger';

// Alternative barrel export syntax
export * from './database';
export * from './api';
export * from './logger';

// models/User.ts
export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string
  ) {}

  toString(): string {
    return \`User(\${this.id}, \${this.name}, \${this.email})\`;
  }
}

// models/index.ts - Barrel export for models
export { User } from './User';
export { Post } from './Post';
export { Comment } from './Comment';

// app.ts - Clean imports using barrel exports
import { dbConfig, apiConfig } from './config';
import { User, Post, Comment } from './models';

// Type-only imports (TypeScript 3.8+)
import type { DatabaseConfig } from './config/database';
import type { User as UserType } from './models/User';

// This import is erased at runtime - only used for types
function processUser(user: UserType): void {
  console.log(user.toString());
}`;

const practiceExercises = [
  {
    title: "Task Management System",
    description: "Build a modular task management system",
    challenge: "Create modules for Task model, TaskService, and utility functions with proper exports/imports.",
    solution: `// models/Task.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
}

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

// services/TaskService.ts
import { Task, TaskStatus } from '../models/Task';

export class TaskService {
  private tasks: Task[] = [];

  createTask(title: string, description: string, dueDate?: Date): Task {
    const task: Task = {
      id: this.generateId(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
      dueDate
    };
    this.tasks.push(task);
    return task;
  }

  completeTask(id: string): boolean {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = true;
      return true;
    }
    return false;
  }

  private generateId(): string {
    return 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}

// utils/dateUtils.ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

export function isOverdue(dueDate: Date): boolean {
  return dueDate < new Date();
}`
  }
];

const ModulesPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="secondary">Intermediate</Badge>
              <Badge variant="outline">20 min read</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Modules & Namespaces</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to organize and structure your TypeScript code using modules, imports, exports, 
              and understand when to use namespaces in modern TypeScript development.
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
                  <span>ES6 module syntax (import/export)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Named exports vs default exports</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Module organization patterns</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Barrel exports and re-exports</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Namespaces (legacy patterns)</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-12">
            {/* Module Basics Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Module Basics</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Modules are the primary way to organize code in modern TypeScript. They use ES6 import/export 
                syntax and help you create reusable, maintainable code with clear dependencies.
              </p>
              
              <CodeBlock 
                code={moduleBasicsCode}
                title="Basic Module Import/Export"
                sandboxUrl="https://stackblitz.com/edit/typescript-modules-basic"
              />

              <Alert className="mt-6">
                <Package className="h-4 w-4" />
                <AlertDescription>
                  <strong>Best Practice:</strong> Use named exports for utilities and classes, 
                  default exports for the main export of a module. Avoid mixing too many of both in one file.
                </AlertDescription>
              </Alert>
            </section>

            {/* Module Patterns Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Module Organization Patterns</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Learn common patterns for organizing modules in real applications, including service modules, 
                type-only exports, and re-export patterns for clean imports.
              </p>
              
              <CodeBlock 
                code={modulePatternCode}
                title="Module Organization Patterns"
                sandboxUrl="https://stackblitz.com/edit/typescript-module-patterns"
              />
            </section>

            {/* Namespaces Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Namespaces (Legacy Pattern)</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Namespaces are a TypeScript-specific way to organize code. While modules are preferred in modern 
                development, understanding namespaces is useful for working with legacy code.
              </p>
              
              <CodeBlock 
                code={namespacesCode}
                title="Namespace Examples"
                sandboxUrl="https://stackblitz.com/edit/typescript-namespaces"
              />
            </section>

            {/* Module Resolution Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Advanced Module Patterns</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Explore advanced module patterns including barrel exports, type-only imports, and strategies 
                for organizing large codebases effectively.
              </p>
              
              <CodeBlock 
                code={moduleResolutionCode}
                title="Advanced Module Patterns"
                sandboxUrl="https://stackblitz.com/edit/typescript-advanced-modules"
              />
            </section>

            {/* Practice Exercises */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Practice Exercise</h2>
              <p className="text-muted-foreground mb-6">
                Build a modular application to practice module organization.
              </p>

              <Tabs defaultValue="exercise-0" className="space-y-6">
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="exercise-0">
                    Task Management System
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="exercise-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>{practiceExercises[0].title}</CardTitle>
                      <CardDescription>{practiceExercises[0].description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="font-medium mb-2">Challenge:</p>
                        <p className="text-sm">{practiceExercises[0].challenge}</p>
                      </div>
                      <details className="group">
                        <summary className="cursor-pointer text-sm text-primary hover:underline">
                          Show Solution
                        </summary>
                        <div className="mt-2">
                          <CodeBlock 
                            code={practiceExercises[0].solution}
                            title="Solution"
                          />
                        </div>
                      </details>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>

            {/* Navigation */}
            <section className="border-t pt-12 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Previous: Generics</CardTitle>
                    <CardDescription>
                      Learn about creating flexible, reusable components
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/concepts/generics">
                        ← Back to Generics
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <CardTitle>Next: Advanced Topics</CardTitle>
                    <CardDescription>
                      Explore advanced TypeScript patterns and techniques
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full group-hover:translate-x-1 transition-transform">
                      <Link to="/advanced">
                        Continue to Advanced
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

export default ModulesPage;