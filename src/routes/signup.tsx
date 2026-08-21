import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignupForm } from "#/features/auth/components/signup-form";
import { getCurrentUser } from "#/features/auth/session";
import { getAuthRouteRedirect } from "#/features/auth/session-model";

function SignupPage() {
  return (
    <div className="mx-auto w-full max-w-sm px-6 py-20 md:py-28">
      <SignupForm />
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
