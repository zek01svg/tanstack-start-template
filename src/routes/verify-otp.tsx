import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod/v4";
import { VerifyOtpForm } from "#/features/auth/components/verify-otp";

const searchSchema = z.object({
  email: z.email(),
  flow: z.enum(["sign-in", "sign-up"]),
});

function VerifyOtpPage() {
  const { email, flow } = Route.useSearch();
  return (
    <div className="stark-gradient flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <VerifyOtpForm
        email={email}
        flow={flow}
        className="glass-card w-full max-w-sm rounded-2xl p-8"
      />
    </div>
  );
}

export const Route = createFileRoute("/verify-otp")({
  validateSearch: searchSchema,
  component: VerifyOtpPage,
});
