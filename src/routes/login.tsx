import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "#/features/auth/components/login-form";
import { getCurrentUser } from "#/features/auth/session";
import { getAuthRouteRedirect } from "#/features/auth/session-model";

function LoginPage() {
  return (
    <div className="stark-gradient flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <LoginForm className="glass-card w-full max-w-sm rounded-2xl p-8" />
    </div>
  );
}

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    const redirectTo = getAuthRouteRedirect(await getCurrentUser());

    if (redirectTo) {
      throw redirect({ to: redirectTo });
    }
  },
  component: LoginPage,
});
