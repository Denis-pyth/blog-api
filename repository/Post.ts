import prisma from "../db/prisma";
import type { Post } from "../generated/prisma";


export type { Post };


export interface CreatePostInput {
    title: string;
    content: string;
    slug: string;
    authorId: string; 
    published?: boolean;
}

export interface UpdatePostInput {
    title?: string;   
    content?: string;
    slug?: string;
    published?: boolean;
}

// Create post
export async function create(input: CreatePostInput): Promise<Post> {
    return prisma.post.create({
        data: {
            title: input.title,
            content: input.content,
            slug: input.slug,
            published: input.published ?? false,
            author: {
                connect: { id: input.authorId },
            },
        },
    });
}

// GET all posts
export async function getAll(): Promise<Post[]> {
    return prisma.post.findMany({
        where: {
            deletedAt: null,
            published: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

// GET post by ID
export async function getById(id: string): Promise<Post | null> {
    return prisma.post.findUnique({
        where: {
            id,
            deletedAt: null, 
        },
    });
}

// GET post by slug
export async function getBySlug(slug: string): Promise<Post | null> {
    return prisma.post.findUnique({
        where: {
            slug,
            deletedAt: null,
        },
    });
}

// Update post
export async function update(id: string, input: UpdatePostInput): Promise<Post | null> {
    return prisma.post.update({
        where: { id },
        data: {
            ...input,
        },
    });
}

// Soft delete post
export async function remove(id: string): Promise<boolean> {
    try {
        await prisma.post.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
        return true;
    } catch {
        return false;
    }
}