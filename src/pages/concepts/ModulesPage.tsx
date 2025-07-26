import { Layout } from "@/components/Layout";
import { CodeBlock } from "@/components/CodeBlock";

const moduleCode = `// math.ts - Module with exports
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export const PI = 3.14159;

// Default export
export default class Calculator {
  static calculate(operation: string, a: number, b: number): number {
    switch (operation) {
      case 'add': return add(a, b);
      case 'multiply': return multiply(a, b);
      default: throw new Error('Unknown operation');
    }
  }
}

// app.ts - Importing modules
import Calculator, { add, multiply, PI } from './math';

const result1 = add(5, 3);
const result2 = Calculator.calculate('multiply', 4, 7);`;

const ModulesPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Modules & Namespaces</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Organize code with modules, imports, exports, and namespaces.
          </p>
          <CodeBlock 
            code={moduleCode}
            title="Modules Example"
            sandboxUrl="https://stackblitz.com/edit/typescript-modules"
          />
        </div>
      </div>
    </Layout>
  );
};

export default ModulesPage;