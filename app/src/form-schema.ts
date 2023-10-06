import { z } from "zod";
export const formSchema = z.object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().email("Invalid email").min(1, "Email is required")
});

export type FormSchemaType = z.infer<typeof formSchema>;