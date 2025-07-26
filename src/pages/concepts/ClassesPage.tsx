import { Layout } from "@/components/Layout";
import { CodeBlock } from "@/components/CodeBlock";

const classCode = `// TypeScript Class Example
class Animal {
  protected name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public speak(): string {
    return \`\${this.name} makes a sound\`;
  }

  protected getAge(): number {
    return this.age;
  }
}

class Dog extends Animal {
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age);
    this.breed = breed;
  }

  public speak(): string {
    return \`\${this.name} barks!\`;
  }

  public getInfo(): string {
    return \`\${this.name} is a \${this.breed}, age \${this.getAge()}\`;
  }
}`;

const ClassesPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Classes & Inheritance</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Object-oriented programming with TypeScript classes and inheritance patterns.
          </p>
          <CodeBlock 
            code={classCode}
            title="Class Example"
            sandboxUrl="https://stackblitz.com/edit/typescript-classes"
          />
        </div>
      </div>
    </Layout>
  );
};

export default ClassesPage;