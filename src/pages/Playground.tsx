import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Play, Sparkles, RotateCcw, Share2 } from "lucide-react";
import { toast } from "sonner";

const STARTER = `// Try editing me!
function add(a: number, b: number): number {
  return a + b;
}

console.log("2 + 3 =", add(2, 3));
console.log("Hello from TypeScript!");
`;

const EXAMPLES: Record<string, string> = {
  Interfaces: `interface User {
  id: string;
  name: string;
  email: string;
}

const me: User = { id: "1", name: "Ada", email: "ada@ex.com" };
console.log("User:", me.name);
`,
  Generics: `function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(first([1, 2, 3]));
console.log(first(["a", "b", "c"]));
`,
  "Type Guards": `type Shape = { kind: "circle"; r: number } | { kind: "square"; size: number };

function area(s: Shape): number {
  if (s.kind === "circle") return Math.PI * s.r ** 2;
  return s.size * s.size;
}

console.log(area({ kind: "circle", r: 5 }));
console.log(area({ kind: "square", size: 4 }));
`,
};

function decode(param: string | null): string | null {
  if (!param) return null;
  try {
    return decodeURIComponent(escape(atob(param.replace(/-/g, "+").replace(/_/g, "/"))));
  } catch {
    return null;
  }
}

function encode(text: string): string {
  return btoa(unescape(encodeURIComponent(text))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export default function Playground() {
  const [code, setCode] = useState(STARTER);
  const [output, setOutput] = useState<string[]>(["Click Run to see console.log output here."]);

  // Hydrate from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = decode(params.get("c"));
    if (fromUrl) setCode(fromUrl);
  }, []);

  const run = () => {
    const lines: string[] = [];
    const regex = /console\.log\(([^)]*)\)/g;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(code)) !== null) {
      lines.push("> " + m[1].trim());
    }
    if (lines.length === 0) lines.push("(no console.log calls found)");
    lines.push(
      "",
      "ℹ️ This preview shows the arguments to console.log. For real TS execution, use the TypeScript Playground at typescriptlang.org/play."
    );
    setOutput(lines);
  };

  const reset = () => {
    setCode(STARTER);
    setOutput(["Click Run to see console.log output here."]);
    const url = new URL(window.location.href);
    url.searchParams.delete("c");
    window.history.replaceState({}, "", url.toString());
    toast.success("Reset to starter code");
  };

  const share = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("c", encode(code));
    window.history.replaceState({}, "", url.toString());
    try {
      await navigator.clipboard.writeText(url.toString());
      toast.success("Shareable link copied to clipboard");
    } catch {
      toast.error("Couldn't copy — link is now in the address bar");
    }
  };

  return (
    <Layout>
      <div className="container py-10">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Playground</h1>
            <p className="text-muted-foreground text-sm">Edit, run, and share your snippet.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(EXAMPLES).map((k) => (
              <Button key={k} size="sm" variant="outline" onClick={() => setCode(EXAMPLES[k])}>
                <Sparkles className="h-3.5 w-3.5 mr-1" /> {k}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b px-3 py-2 bg-muted/50">
              <span className="text-xs font-mono text-muted-foreground">main.ts</span>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={reset} title="Reset to starter">
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" variant="ghost" onClick={share} title="Copy shareable link">
                  <Share2 className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" onClick={run}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
              </div>
            </div>
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-sm border-0 rounded-none min-h-[420px] focus-visible:ring-0 resize-none"
              spellCheck={false}
            />
          </Card>
          <Card className="p-0 overflow-hidden">
            <div className="border-b px-3 py-2 bg-muted/50">
              <span className="text-xs font-mono text-muted-foreground">output</span>
            </div>
            <pre className="p-4 text-sm font-mono whitespace-pre-wrap min-h-[420px] text-foreground/90">
              {output.join("\n")}
            </pre>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
