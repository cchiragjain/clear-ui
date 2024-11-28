import { z } from "zod";

export const userFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z
    .number()
    .min(18, "Must be at least 18 years old")
    .max(100, "Must be under 100 years old"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  country: z.string().min(1, "Please select a country"),
  bio: z.string().max(500, "Bio must be less than 500 characters"),
  newsletter: z.boolean(),
  experience: z.number().min(0).max(100),
});

export type UserFormData = z.infer<typeof userFormSchema>;
