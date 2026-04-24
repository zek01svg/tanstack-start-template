import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "#/features/auth/components/signup-form";

function SignupPage() {
  return (
    <div className="stark-gradient flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <SignupForm className="glass-card w-full max-w-sm rounded-2xl p-8" />
    </div>
  );
}

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});
