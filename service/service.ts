import * as Post from "../repository/Post";
import type { Post as PostType, CreatePostInput, UpdatePostInput,  PaginationInput, PaginatedPosts } from "../repository/Post";

export async function createPost(data: CreatePostInput): Promise<PostType> {
    if (!data.title || !data.content || !data.slug || !data.authorId) {
        throw new Error("Title, content, slug and authorId are required");
    }
    return await Post.create(data);
}

export async function getAllPosts(pagination: PaginationInput = {}): Promise<PaginatedPosts> {
    return await Post.getAll(pagination);
}

export async function getPostById(id: string): Promise<PostType> {
    const post = await Post.getById(id);
    if (!post) throw new Error("Post not found");
    return post;
}

export async function getPostBySlug(slug: string): Promise<PostType> {
    const post = await Post.getBySlug(slug);
    if (!post) throw new Error("Post not found");
    return post;
}

export async function updatePost(id: string, data: UpdatePostInput): Promise<PostType> {
    const updated = await Post.update(id, data);
    if (!updated) throw new Error("Post not found");
    return updated;
}

export async function deletePost(id: string): Promise<boolean> {
    const deleted = await Post.remove(id);
    if (!deleted) throw new Error("Post not found");
    return true;
}