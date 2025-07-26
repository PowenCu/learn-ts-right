import { Layout } from "@/components/Layout";
import { CodeBlock } from "@/components/CodeBlock";

const genericsCode = `// Generic Functions
function identity<T>(arg: T): T {
  return arg;
}

// Usage with different types
const stringResult = identity<string>("Hello");
const numberResult = identity<number>(42);
const arrayResult = identity<number[]>([1, 2, 3]);

// Generic Interfaces
interface Container<T> {
  value: T;
  getValue(): T;
}

class Box<T> implements Container<T> {
  constructor(public value: T) {}
  
  getValue(): T {
    return this.value;
  }
}

const stringBox = new Box<string>("TypeScript");
const numberBox = new Box<number>(100);`;

const GenericsPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Generics</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Create flexible, reusable components with TypeScript generics.
          </p>
          <CodeBlock 
            code={genericsCode}
            title="Generics Example"
            sandboxUrl="https://stackblitz.com/edit/typescript-generics"
          />
        </div>
      </div>
    </Layout>
  );
};

export default GenericsPage;