import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  sandboxUrl?: string;
  filename?: string;
}

export const CodeBlock = ({ 
  code, 
  language = "typescript", 
  title, 
  sandboxUrl,
  filename 
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy code");
    }
  };

  return (
    <div className="relative bg-code rounded-lg border overflow-hidden">
      {/* Header */}
      {(title || filename || sandboxUrl) && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b">
          <div className="flex items-center space-x-2">
            {filename && (
              <span className="text-sm font-mono text-muted-foreground">
                {filename}
              </span>
            )}
            {title && (
              <span className="text-sm font-medium">
                {title}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {sandboxUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(sandboxUrl, '_blank')}
                className="h-8 px-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Open in sandbox</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-2"
            >
              {copied ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy code</span>
            </Button>
          </div>
        </div>
      )}

      {/* Code Content */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm">
          <code className="text-code-foreground font-mono whitespace-pre">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};