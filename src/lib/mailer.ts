import { env } from "#/env";
import { Resend } from "resend";
import * as React from "react";
import { logger } from "#/lib/logger";

const mailer = new Resend(env.RESEND_API_KEY);

/**
 * Sends an email via the Resend API using a React component.
 *
 * @param {string} to - Recipient email.
 * @param {string} subject - Email subject.
 * @param {React.ReactElement} react - React component for the email body.
 */
export async function sendEmail(to: string, subject: string, react: React.ReactElement) {
  logger.info("Sending email", {
    to,
    subject,
  });

  const { data, error } = await mailer.emails.send({
    from: "TanStack Start <onboarding@resend.dev>",
    to: to,
    subject: subject,
    react: react,
  });

  if (error) {
    logger.error("Failed to send email", {
      to,
      error,
    });
    throw new Error(`Failed to send email: ${error}`);
  }

  logger.info("Successfully sent email", {
    to,
    id: data.id,
  });
  return data;
}
