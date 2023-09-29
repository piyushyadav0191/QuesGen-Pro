import { z } from "zod";

export const feedbackSchema = z.object({
  name: z
    .string()
    .min(4, { message: "name must be at least 4 characters long" })
    .max(50),
  feedback: z
    .string()
    .max(500, { message: "feedback must be at most 500 characters long" }),
});
