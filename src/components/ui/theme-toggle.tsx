import * as React from "react";
import { useTheme } from "../providers/theme-provider";
import { cn } from "#/lib/utils";
import { Moon, Sun } from "lucide-react";
import { Skeleton } from "./skeleton";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Skeleton aria-hidden="true" className="border-border h-9 w-[70px] rounded-full border" />
    );
  }

  const themes = [
    { id: "light", icon: Sun, label: "Light" },
    { id: "dark", icon: Moon, label: "Dark" },
  ] as const;

  return (
    <div className="border-border bg-muted/50 relative inline-flex items-center gap-1 rounded-full border p-1 shadow-inner">
      {themes.map(t => {
        const Icon = t.icon;
        const isActive = theme === t.id;

        return (
          <button
            key={t.id}
            type="button"
            onClick={() => setTheme(t.id)}
            className={cn(
              "relative flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 outline-none after:absolute after:content-[''] after:-inset-2 after:pointer-events-none",
              isActive
                ? "bg-background text-primary z-10 scale-110 shadow-sm"
                : "text-muted-foreground hover:bg-background/40 hover:text-foreground"
            )}
            aria-label={`${t.label} theme`}
            title={t.label}
          >
            <Icon size={14} className={cn("transition-transform", isActive && "scale-110")} />
          </button>
        );
      })}
    </div>
  );
}
