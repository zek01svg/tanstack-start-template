import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignupForm } from "#/features/auth/components/signup-form";
import { getCurrentUser } from "#/features/auth/session";
import { getAuthRouteRedirect } from "#/features/auth/session-model";

function SignupPage() {
  return (
    <div className="stark-gradient flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <SignupForm className="glass-card w-full max-w-sm rounded-2xl p-8" />
    </div>
  );
}

export const Route = createFileRoute("/signup")({
  beforeLoad: async () => {
    const redirectTo = getAuthRouteRedirect(await getCurrentUser());

    if (redirectTo) {
      throw redirect({ to: redirectTo });
    }
  },
  component: SignupPage,
});
