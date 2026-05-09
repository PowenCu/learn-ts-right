export type LessonCategory =
  | "Basics"
  | "Types"
  | "Functions"
  | "Generics"
  | "React"
  | "Advanced";

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  category: LessonCategory;
  readTimeMinutes: number;
  order: number;
  excerpt: string;
  content: string;
}

export const CATEGORIES: LessonCategory[] = [
  "Basics",
  "Types",
  "Functions",
  "Generics",
  "React",
  "Advanced",
];

export const lessons: Lesson[] = [
  {
    id: "1",
    slug: "what-is-typescript",
    title: "What is TypeScript?",
    category: "Basics",
    readTimeMinutes: 4,
    order: 1,
    excerpt: "A friendly intro to TypeScript and why it exists.",
    content: `TypeScript is a strongly typed superset of JavaScript developed by Microsoft. Every valid JavaScript program is also a valid TypeScript program — TS adds an optional layer of static types on top, which the compiler checks before your code ever runs.

The big payoff is confidence. Types catch entire categories of bugs (typos, wrong shapes, missing arguments) at edit time, and they double as inline documentation. Modern editors use the type information for autocomplete, instant refactors, and "go to definition" across an entire codebase.

When you're done writing, the TypeScript compiler erases all the type annotations and emits plain JavaScript that runs anywhere JS does — browsers, Node, Deno, Bun.

\`\`\`ts
// hello.ts
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

greet("Ada");      // ✅
greet(42);         // ❌ Argument of type 'number' is not assignable to 'string'
\`\`\``,
  },
  {
    id: "2",
    slug: "primitive-types",
    title: "Primitive Types & Type Annotations",
    category: "Types",
    readTimeMinutes: 5,
    order: 2,
    excerpt: "string, number, boolean, arrays, and the syntax for annotating them.",
    content: `TypeScript's primitive types mirror JavaScript's: \`string\`, \`number\`, \`boolean\`, \`null\`, \`undefined\`, \`bigint\`, and \`symbol\`. You annotate a variable by adding \`: Type\` after its name.

In most cases you don't need to annotate at all — TypeScript infers the type from the value. Annotations are most useful on function parameters and on variables that start out empty.

Arrays use \`T[]\` (or \`Array<T>\`), and tuple types let you describe a fixed-length array where each position has its own type.

\`\`\`ts
const username: string = "ada";
const age = 36;                  // inferred as number
const isAdmin: boolean = true;

const scores: number[] = [98, 87, 73];
const point: [number, number] = [10, 20];   // tuple
\`\`\``,
  },
  {
    id: "3",
    slug: "interfaces-vs-type-aliases",
    title: "Interfaces vs Type Aliases",
    category: "Types",
    readTimeMinutes: 6,
    order: 3,
    excerpt: "Two ways to name a shape — when to use each.",
    content: `Interfaces and type aliases both let you give a name to the shape of an object. For most everyday object shapes they're interchangeable.

The differences show up at the edges. Interfaces support declaration merging — you can declare the same interface twice and the fields combine. Type aliases can describe things interfaces can't, like unions, tuples, or computed/mapped types.

A good default: use \`interface\` for object shapes that might be extended (especially public APIs and library types), and \`type\` when you need unions, intersections, or any non-object shape.

\`\`\`ts
interface User {
  id: string;
  email: string;
}

type Status = "idle" | "loading" | "success" | "error";

type UserWithStatus = User & { status: Status };
\`\`\``,
  },
  {
    id: "4",
    slug: "typing-functions",
    title: "Typing Functions",
    category: "Functions",
    readTimeMinutes: 5,
    order: 4,
    excerpt: "Parameters, return types, optional args, and function types.",
    content: `Function parameters are annotated like variables, and a return type goes after the parameter list. Return types are usually inferred, but writing them explicitly on exported functions is a great habit — it locks in the contract.

Mark parameters as optional with \`?\` or give them defaults. You can also describe a function's signature as a standalone type and reuse it.

\`\`\`ts
function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string, greeting = "Hello"): string {
  return \`\${greeting}, \${name}\`;
}

type Predicate<T> = (value: T) => boolean;

const isEven: Predicate<number> = (n) => n % 2 === 0;
\`\`\``,
  },
  {
    id: "5",
    slug: "introduction-to-generics",
    title: "Introduction to Generics",
    category: "Generics",
    readTimeMinutes: 7,
    order: 5,
    excerpt: "Reusable code that keeps its types — without resorting to any.",
    content: `Generics let you write a function or type that works over many types while preserving their relationships. Think of them as type-level parameters.

A common first example is an identity function: it returns its argument unchanged. With generics we capture the input's type and use the same type as the return type, so callers get back exactly what they put in.

You can also constrain a generic with \`extends\` to require certain properties.

\`\`\`ts
function identity<T>(value: T): T {
  return value;
}

const n = identity(42);          // n: number
const s = identity("hello");     // s: string

function lengthOf<T extends { length: number }>(value: T): number {
  return value.length;
}

lengthOf("hi");        // ✅ 2
lengthOf([1, 2, 3]);   // ✅ 3
\`\`\``,
  },
  {
    id: "6",
    slug: "typescript-with-react-props",
    title: "TypeScript with React Props",
    category: "React",
    readTimeMinutes: 6,
    order: 6,
    excerpt: "Type your component props with confidence.",
    content: `In React + TS, you describe your component's props with an interface or type alias and pass it to the function as a generic-style annotation. This gives you autocomplete on usage and errors when a required prop is missing.

For children, prefer \`React.ReactNode\` over \`React.ReactChild\`. For event handlers, lean on React's built-in event types like \`React.MouseEvent<HTMLButtonElement>\`.

Avoid \`React.FC\` — it adds an implicit \`children\` and provides no real value over a plain function with a typed props parameter.

\`\`\`tsx
interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary";
}

export function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return (
    <button onClick={onClick} data-variant={variant}>
      {label}
    </button>
  );
}
\`\`\``,
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}

export function getAdjacentLessons(slug: string): {
  prev?: Lesson;
  next?: Lesson;
} {
  const sorted = [...lessons].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((l) => l.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? sorted[idx - 1] : undefined,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : undefined,
  };
}
