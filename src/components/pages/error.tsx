import { ArrowRight } from "lucide-react";
import { cn } from "#/lib/utils";

interface ErrorPageProps {
  error: Error | string | unknown;
  reset?: () => void;
  className?: string;
  title?: string;
}

export function ErrorPage({
  error,
  reset,
  className,
  title = "Something went wrong",
}: ErrorPageProps) {
  const message = error instanceof Error ? error.message : String(error);

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col items-center justify-center p-6 bg-background selection:bg-primary/20 relative",
        className
      )}
    >
      <div className="absolute inset-0 stark-gradient pointer-events-none opacity-40" />

      <main className="relative z-10 w-full max-w-md text-center space-y-8 animate-in fade-in duration-700">
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
            We encountered an unexpected error while processing your request.
          </p>
        </div>

        <div className="group relative">
          <div className="absolute -inset-0.5 bg-destructive/20 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
          <pre className="relative bg-muted/30 backdrop-blur-sm text-muted-foreground p-5 rounded-xl text-xs font-mono border border-border/50 overflow-auto max-h-48 text-left selection:bg-destructive/30">
            {message}
          </pre>
        </div>

        <div className="flex flex-col items-center gap-4">
          {reset && (
            <button
              onClick={reset}
              className="group inline-flex items-center gap-2 text-foreground font-medium text-sm border-b-2 border-foreground pb-1 hover:opacity-70 transition-all cursor-pointer"
            >
              Try again
              <ArrowRight className="size-3.5 opacity-40 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
          <a
            href="/"
            className="group inline-flex items-center gap-2 text-foreground font-medium text-sm border-b-2 border-foreground pb-1 hover:opacity-70 transition-all"
          >
            Back to home
            <ArrowRight className="size-3.5 opacity-40 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </main>
    </div>
  );
}
