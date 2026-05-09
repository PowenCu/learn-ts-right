import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Learn TS Right</p>
        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-foreground">
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a href="#" className="hover:text-foreground">About</a>
          <span>Built with React · TypeScript · Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
