import { z } from "zod/v4";

export const EmailSchema = z.object({
  type: z.enum(["verification", "reset-password"]),
  to: z.string().email(),
  subject: z.string().min(1),
  data: z.object({
    url: z.string().url(),
  }),
});

export type EmailRequest = z.infer<typeof EmailSchema>;
