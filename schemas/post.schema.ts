import { z } from "zod";

export const CreatePostSchema = z.object({
    title: z.string()
        .min(3, "Title must be at least 3 characters")
        .max(255, "Title must be at most 255 characters"),
    content: z.string()
        .min(10, "Content must be at least 10 characters"),
    published: z.boolean().optional().default(false),  
});

export const UpdatePostSchema = z.object({
    title: z.string()
        .min(3, "Title must be at least 3 characters")
        .max(255, "Title must be at most 255 characters")
        .optional(),
    content: z.string()
        .min(10, "Content must be at least 10 characters")
        .optional(),
    published: z.boolean().optional(),
});

export type CreatePostInput = z.infer<typeof CreatePostSchema>;
export type UpdatePostInput = z.infer<typeof UpdatePostSchema>;