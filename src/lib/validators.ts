import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const usnSchema = z.object({
  usn: z
    .string()
    .min(3, "USN must be at least 3 characters")
    .max(20, "USN must be at most 20 characters")
    .trim()
    .toUpperCase(),
});

export const studentSchema = z.object({
  usn: z
    .string()
    .min(3, "USN must be at least 3 characters")
    .max(20, "USN must be at most 20 characters")
    .trim()
    .toUpperCase(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .trim(),
});

export const markSchema = z.object({
  student_id: z.string().uuid("Invalid student ID"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(100, "Subject must be at most 100 characters")
    .trim(),
  marks: z
    .number()
    .int("Marks must be a whole number")
    .min(0, "Marks cannot be negative")
    .max(100, "Marks cannot exceed 100"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type UsnInput = z.infer<typeof usnSchema>;
export type StudentInput = z.infer<typeof studentSchema>;
export type MarkInput = z.infer<typeof markSchema>;
