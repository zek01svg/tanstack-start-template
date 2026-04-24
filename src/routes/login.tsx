import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "#/features/auth/components/login-form";

function LoginPage() {
  return (
    <div className="stark-gradient flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <LoginForm className="glass-card w-full max-w-sm rounded-2xl p-8" />
    </div>
  );
}

export const Route = createFileRoute("/login")({
  component: LoginPage,
});
