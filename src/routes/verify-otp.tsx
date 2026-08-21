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
    <div className="mx-auto w-full max-w-sm px-6 py-20 md:py-28">
      <VerifyOtpForm email={email} flow={flow} />
    </div>
  );
}

export const Route = createFileRoute("/verify-otp")({
  validateSearch: searchSchema,
  component: VerifyOtpPage,
});
