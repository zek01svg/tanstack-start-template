import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { emailOTP } from "better-auth/plugins";
import { passkey } from "@better-auth/passkey";
import { createElement } from "react";

import { db } from "#/db";
import * as schema from "#/db/schema";
import { env } from "#/env";
import { sendEmail } from "#/lib/mailer";
import { OtpEmail } from "#/features/emails/components/otp-email";
import { logger } from "#/lib/logger";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,

  socialProviders: {
    google: {
      prompt: "select_account consent",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      getUserInfo: async token => {
        const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });
        const profile = await response.json();
        return {
          user: {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            emailVerified: profile.verified_email,
          },
          data: profile,
        };
      },
    },
  },
  plugins: [
    tanstackStartCookies(),
    passkey({
      rpName: "TanStack Start Template",
      rpID: new URL(env.BETTER_AUTH_URL).hostname,
      origin: env.BETTER_AUTH_URL,
    }),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const subject = type === "email-verification" ? "Verify your email" : "Your sign-in code";
        logger.info("Sending OTP email", { email, type });
        await sendEmail(email, subject, createElement(OtpEmail, { otp, type }));
      },
      expiresIn: 600,
    }),
  ],
});
