import { Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useState } from "react";

import { authClient } from "#/lib/auth-client";
import { Button } from "#/components/ui/button";
import { ThemeToggle } from "../ui/theme-toggle";

export function Header() {
  const { data: session } = authClient.useSession();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
    setSigningOut(false);
  };

  return (
    <header className="glass-header">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        <nav className="flex w-full items-center justify-between">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <img
              className="h-6 w-auto hidden dark:block"
              src="https://tanstack.com/images/logos/logo-word-white.svg"
              alt="TanStack"
            />
            <img
              className="h-6 w-auto block dark:hidden"
              src="https://tanstack.com/images/logos/logo-word-black.svg"
              alt="TanStack"
            />
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            {session?.user && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={signingOut}
                onClick={() => void handleSignOut()}
              >
                <LogOut />
                Sign out
              </Button>
            )}
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
