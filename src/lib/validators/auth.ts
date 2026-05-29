import { z } from "zod";

// REGISTER
export const registerSchema = z.object({
  email: z.string().email("Invalid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[0-9]/, "Must contain number"),

  name: z.string().min(1),
  surname: z.string().min(1),

  phone: z.string().min(7).max(20),

  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
});

// LOGIN
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
