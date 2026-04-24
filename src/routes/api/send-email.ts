import { createFileRoute } from "@tanstack/react-router";
import { sendEmail } from "#/lib/mailer";
import { VerificationEmail } from "#/features/emails/components/verification-email";
import { ResetPasswordEmail } from "#/features/emails/components/reset-password-email";
import { EmailSchema } from "#/features/emails/schema/email";
import * as React from "react";
import { logger } from "#/lib/logger";

export const Route = createFileRoute("/api/send-email")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json();
        const result = EmailSchema.safeParse(body);

        if (!result.success) {
          logger.warn("Invalid email request payload", {
            errors: result.error,
          });
          return Response.json(
            {
              error: "Invalid request data",
              details: result.error,
            },
            { status: 400 }
          );
        }

        const { to, subject, type, data } = result.data;
        logger.info("Processing email request", {
          type,
          to,
        });

        try {
          let emailComponent: React.ReactElement;

          switch (type) {
            case "verification":
              emailComponent = React.createElement(VerificationEmail, { url: data.url });
              break;
            case "reset-password":
              emailComponent = React.createElement(ResetPasswordEmail, {
                url: data.url,
                user: { email: to },
              });
              break;
            default:
              throw new Error(`Unhandled email type: ${type}`);
          }

          const sendResult = await sendEmail(to, subject, emailComponent);

          logger.info("Email API request successful", {
            to,
          });
          return Response.json({ success: true, data: sendResult });
        } catch (error: unknown) {
          logger.error("Failed to process email api request", {
            error,
            type,
            to,
          });
          return Response.json({ error: "Internal server error" }, { status: 500 });
        }
      },
    },
  },
});
