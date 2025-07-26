import { Layout } from "@/components/Layout";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, ArrowRight, Lightbulb, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const basicClassCode = `// Basic TypeScript Class
class Animal {
  // Properties with access modifiers
  protected name: string;
  private age: number;
  public species: string;

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  // Public method
  public speak(): string {
    return \`\${this.name} makes a sound\`;
  }

  // Protected method (accessible in subclasses)
  protected getAge(): number {
    return this.age;
  }

  // Private method (only accessible within this class)
  private validateAge(age: number): boolean {
    return age > 0 && age < 100;
  }
}

// Creating instances
const dog = new Animal("Buddy", 3, "Canine");
console.log(dog.speak()); // "Buddy makes a sound"
console.log(dog.species); // "Canine" - public property
// console.log(dog.age);  // Error: 'age' is private`;

const inheritanceCode = `// Base class
class Vehicle {
  protected brand: string;
  protected year: number;

  constructor(brand: string, year: number) {
    this.brand = brand;
    this.year = year;
  }

  getInfo(): string {
    return \`\${this.year} \${this.brand}\`;
  }

  start(): string {
    return "Vehicle starting...";
  }
}

// Inheritance with method overriding
class Car extends Vehicle {
  private doors: number;
  private fuelType: string;

  constructor(brand: string, year: number, doors: number, fuelType: string) {
    super(brand, year); // Call parent constructor
    this.doors = doors;
    this.fuelType = fuelType;
  }

  // Override parent method
  start(): string {
    return \`\${this.brand} car engine starting...\`;
  }

  // New method specific to Car
  openTrunk(): string {
    return "Trunk opened";
  }

  getCarDetails(): string {
    return \`\${this.getInfo()}, \${this.doors} doors, \${this.fuelType}\`;
  }
}

// Electric car extends Car
class ElectricCar extends Car {
  private batteryCapacity: number;

  constructor(brand: string, year: number, doors: number, batteryCapacity: number) {
    super(brand, year, doors, "Electric");
    this.batteryCapacity = batteryCapacity;
  }

  start(): string {
    return \`\${this.brand} electric motor starting silently...\`;
  }

  charge(): string {
    return \`Charging \${this.batteryCapacity}kWh battery\`;
  }
}`;

const abstractClassCode = `// Abstract classes cannot be instantiated directly
abstract class Shape {
  protected color: string;

  constructor(color: string) {
    this.color = color;
  }

  // Concrete method available to all subclasses
  getColor(): string {
    return this.color;
  }

  // Abstract methods must be implemented by subclasses
  abstract getArea(): number;
  abstract getPerimeter(): number;
  abstract draw(): string;
}

class Circle extends Shape {
  private radius: number;

  constructor(color: string, radius: number) {
    super(color);
    this.radius = radius;
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }

  draw(): string {
    return \`Drawing a \${this.color} circle with radius \${this.radius}\`;
  }
}

class Rectangle extends Shape {
  private width: number;
  private height: number;

  constructor(color: string, width: number, height: number) {
    super(color);
    this.width = width;
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }

  draw(): string {
    return \`Drawing a \${this.color} rectangle \${this.width}x\${this.height}\`;
  }
}`;

const staticMembersCode = `class MathUtils {
  // Static property
  static readonly PI = 3.14159;
  private static instanceCount = 0;

  // Instance property
  private id: number;

  constructor() {
    MathUtils.instanceCount++;
    this.id = MathUtils.instanceCount;
  }

  // Static methods
  static add(a: number, b: number): number {
    return a + b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }

  static getInstanceCount(): number {
    return MathUtils.instanceCount;
  }

  // Instance method
  getId(): number {
    return this.id;
  }

  // Static method accessing static members
  static circleArea(radius: number): number {
    return MathUtils.PI * radius ** 2;
  }
}

// Using static members without creating instances
console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.circleArea(5)); // ~78.54

// Creating instances
const util1 = new MathUtils();
const util2 = new MathUtils();
console.log(MathUtils.getInstanceCount()); // 2`;

const practiceExercises = [
  {
    title: "Employee Management System",
    description: "Create a hierarchy of employee classes",
    challenge: "Build Employee base class and extend it for Manager and Developer with specific properties and methods.",
    solution: `abstract class Employee {
  protected name: string;
  protected id: string;
  protected salary: number;

  constructor(name: string, id: string, salary: number) {
    this.name = name;
    this.id = id;
    this.salary = salary;
  }

  abstract getRole(): string;
  abstract getResponsibilities(): string[];

  getInfo(): string {
    return \`\${this.name} (\${this.id}): $\${this.salary}\`;
  }
}

class Manager extends Employee {
  private teamSize: number;

  constructor(name: string, id: string, salary: number, teamSize: number) {
    super(name, id, salary);
    this.teamSize = teamSize;
  }

  getRole(): string {
    return "Manager";
  }

  getResponsibilities(): string[] {
    return ["Team leadership", "Project planning", "Performance reviews"];
  }
}

class Developer extends Employee {
  private programmingLanguages: string[];

  constructor(name: string, id: string, salary: number, languages: string[]) {
    super(name, id, salary);
    this.programmingLanguages = languages;
  }

  getRole(): string {
    return "Developer";
  }

  getResponsibilities(): string[] {
    return ["Code development", "Testing", "Documentation"];
  }
}`
  }
];

const ClassesPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant="secondary">Intermediate</Badge>
              <Badge variant="outline">25 min read</Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">Classes & Inheritance</h1>
            <p className="text-xl text-muted-foreground">
              Master object-oriented programming with TypeScript classes. Learn about inheritance, 
              access modifiers, abstract classes, and static members.
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
                  <span>Class syntax and constructors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Access modifiers (public, private, protected)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Inheritance and method overriding</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Abstract classes and methods</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Static properties and methods</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-12">
            {/* Basic Classes Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Basic Class Syntax</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Classes in TypeScript provide a way to define blueprints for objects. They include 
                constructors, properties, methods, and access modifiers for encapsulation.
              </p>
              
              <CodeBlock 
                code={basicClassCode}
                title="Basic Class with Access Modifiers"
                sandboxUrl="https://stackblitz.com/edit/typescript-basic-classes"
              />

              <Alert className="mt-6">
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Access Modifiers:</strong> Use <code className="bg-muted px-1 rounded">private</code> for internal implementation, 
                  <code className="bg-muted px-1 rounded">protected</code> for inheritance, and <code className="bg-muted px-1 rounded">public</code> (default) for external access.
                </AlertDescription>
              </Alert>
            </section>

            {/* Inheritance Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Inheritance & Method Overriding</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Inheritance allows you to create new classes based on existing ones, promoting code reuse 
                and establishing clear hierarchies in your application.
              </p>
              
              <CodeBlock 
                code={inheritanceCode}
                title="Class Inheritance Example"
                sandboxUrl="https://stackblitz.com/edit/typescript-class-inheritance"
              />
            </section>

            {/* Abstract Classes Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Abstract Classes</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Abstract classes serve as base classes that cannot be instantiated directly. They can contain 
                both implemented methods and abstract methods that must be implemented by subclasses.
              </p>
              
              <CodeBlock 
                code={abstractClassCode}
                title="Abstract Classes & Methods"
                sandboxUrl="https://stackblitz.com/edit/typescript-abstract-classes"
              />
            </section>

            {/* Static Members Section */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Static Properties & Methods</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Static members belong to the class itself rather than instances. They're useful for 
                utility functions, constants, and tracking class-level information.
              </p>
              
              <CodeBlock 
                code={staticMembersCode}
                title="Static Members Example"
                sandboxUrl="https://stackblitz.com/edit/typescript-static-members"
              />
            </section>

            {/* Practice Exercises */}
            <section className="animate-fade-in">
              <h2 className="text-3xl font-semibold mb-6">Practice Exercise</h2>
              <p className="text-muted-foreground mb-6">
                Apply your class knowledge to build a real-world system.
              </p>

              <Tabs defaultValue="exercise-0" className="space-y-6">
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="exercise-0">
                    Employee System
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
                    <CardTitle>Previous: Interfaces</CardTitle>
                    <CardDescription>
                      Learn about defining object contracts with interfaces
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/concepts/interfaces">
                        ← Back to Interfaces
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <CardTitle>Next: Generics</CardTitle>
                    <CardDescription>
                      Create flexible, reusable components with generics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full group-hover:translate-x-1 transition-transform">
                      <Link to="/concepts/generics">
                        Continue to Generics
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

export default ClassesPage;