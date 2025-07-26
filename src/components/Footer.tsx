import { Link } from "react-router-dom";
import { Code2, Github, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">TypeScript Guide</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Learn TypeScript from JavaScript fundamentals to advanced concepts. 
              Build type-safe applications with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/getting-started" className="text-muted-foreground hover:text-foreground transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link to="/concepts" className="text-muted-foreground hover:text-foreground transition-colors">
                  Core Concepts
                </Link>
              </li>
              <li>
                <Link to="/advanced" className="text-muted-foreground hover:text-foreground transition-colors">
                  Advanced Topics
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/microsoft/TypeScript"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
                >
                  <Github className="h-4 w-4" />
                  <span>TypeScript GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.typescriptlang.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Official Docs
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">
            © 2024 TypeScript Guide. Made with{" "}
            <Heart className="h-4 w-4 inline text-red-500" /> for developers.
          </p>
          <p className="text-muted-foreground text-sm mt-2 sm:mt-0">
            Educational content for the TypeScript community
          </p>
        </div>
      </div>
    </footer>
  );
};