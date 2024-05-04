import { z } from "zod";

export const mcqCreationSchema = z.object({
  topic: z
    .string()
    .min(4, { message: "Topic must be at least 4 characters long" })
    .max(50),
  type: z.enum(["mcq", "open_ended"]),
  level: z.enum(["easy", "medium"]),
  amount: z.number().min(1).max(10),
});

export const careerAdviceSchema = z.object({
  topic: z
    .string()
    .min(4, { message: "Topic must be at least 4 characters long" }),
  experienced: z.enum(["fresher", "experienced"]),
});

export const checkAnswerSchema = z.object({
  questionId: z.string(),
  userAnswer: z.string(),
});
