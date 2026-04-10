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

export interface PaginationInput {
    cursor?: string; 
    limit?: number;   
}

export interface PaginatedPosts {
    posts: Post[];
    nextCursor: string | null; 
    hasMore: boolean;
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
export async function getAll(pagination: PaginationInput = {}): Promise<PaginatedPosts> {
    const limit = pagination.limit ?? 10; 
    const posts = await prisma.post.findMany({
        where: {
            deletedAt: null,
            published: true,
        },
        orderBy: { createdAt: "desc" },
        take: limit + 1,     
        ...(pagination.cursor && {
            cursor: { id: pagination.cursor },
            skip: 1,
        }),
    });   
    const hasMore = posts.length > limit;
    if (hasMore) posts.pop();
    const nextCursor = hasMore ? posts[posts.length - 1].id : null;

    return { posts, nextCursor, hasMore };
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