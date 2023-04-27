import { z } from "zod";

const sendResetEmailPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  password: z.string(),
});

export { sendResetEmailPasswordSchema, resetPasswordSchema };
