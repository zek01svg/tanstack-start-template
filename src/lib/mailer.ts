import { Resend } from "resend";
import * as React from "react";
import { logger } from "#/lib/logger";

export function createMailer(apiKey: string | undefined): Resend | null {
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function sendEmail(to: string, subject: string, react: React.ReactElement) {
  const { env } = await import("#/env");
  const client = createMailer(env.RESEND_API_KEY);

  if (!client) {
    throw new Error(
      "RESEND_API_KEY is not configured. Set it in your environment to enable email sending."
    );
  }

  logger.info("Sending email", { to, subject });

  const from = env.EMAIL_FROM ?? "TanStack Start <onboarding@resend.dev>";

  const { data, error } = await client.emails.send({
    from,
    to,
    subject,
    react,
  });

  if (error) {
    logger.error("Failed to send email", { to, error });
    throw new Error(`Failed to send email: ${JSON.stringify(error)}`);
  }

  logger.info("Successfully sent email", { to, id: data.id });
  return data;
}
