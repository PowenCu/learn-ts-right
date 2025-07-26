import { Layout } from "@/components/Layout";
import { CodeBlock } from "@/components/CodeBlock";

const interfaceCode = `// Basic Interface Definition
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean;  // Optional property
}

// Using the interface
const user: User = {
  id: 1,
  name: "Alice Johnson",
  email: "alice@example.com"
  // isActive is optional, so we can omit it
};

function createUser(userData: User): User {
  return {
    ...userData,
    isActive: userData.isActive ?? true
  };
}`;

const InterfacesPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Interfaces</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Define contracts for objects and create reusable type definitions.
          </p>
          <CodeBlock 
            code={interfaceCode}
            title="Interface Example"
            sandboxUrl="https://stackblitz.com/edit/typescript-interfaces"
          />
        </div>
      </div>
    </Layout>
  );
};

export default InterfacesPage;