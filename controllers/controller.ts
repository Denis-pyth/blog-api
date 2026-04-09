import { Request, Response } from "express";
import * as postService from "../service/service";
import type { CreatePostInput, UpdatePostInput } from "../repository/Post";
import slugify from "slugify";

interface CreatePostBody {
    title: string;
    content: string;
    published?: boolean;
}

export async function createPost(
    req: Request<{}, {}, CreatePostBody>,
    res: Response
): Promise<void> {
    try {
        const { title, content, published } = req.body;
        const slug = slugify(title, { lower: true, strict: true });
        const authorId = req.user!.id.toString();

        const input: CreatePostInput = {
            title,
            content,
            slug,
            authorId,
            published,
        };

        const post = await postService.createPost(input);
        res.status(201).json({ success: true, data: post });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ success: false, message: err.message });
        } else {
            res.status(400).json({ success: false, message: "An unexpected error occurred" });
        }
    }
}

export async function getAllPosts(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, message: err.message });
        } else {
            res.status(500).json({ success: false, message: "An unexpected error occurred" });
        }
    }
}

export async function getPostById(
    req: Request<{ id: string }>,
    res: Response
): Promise<void> {
    try {
        const post = await postService.getPostById(req.params.id);
        res.status(200).json({ success: true, data: post });
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ success: false, message: err.message });
        } else {
            res.status(404).json({ success: false, message: "An unexpected error occurred" });
        }
    }
}


export async function getPostBySlug(
    req: Request<{ slug: string }>,
    res: Response
): Promise<void> {
    try {
        const post = await postService.getPostBySlug(req.params.slug);
        res.status(200).json({ success: true, data: post });
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ success: false, message: err.message });
        } else {
            res.status(404).json({ success: false, message: "An unexpected error occurred" });
        }
    }
}

export async function updatePost(
    req: Request<{ id: string }, {}, UpdatePostInput>,
    res: Response
): Promise<void> {
    try {
        const updated = await postService.updatePost(req.params.id, req.body);
        res.status(200).json({ success: true, data: updated });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ success: false, message: err.message });
        } else {
            res.status(400).json({ success: false, message: "An unexpected error occurred" });
        }
    }
}

export async function deletePost(
    req: Request<{ id: string }>,
    res: Response
): Promise<void> {
    try {
        await postService.deletePost(req.params.id);
        res.status(204).send();
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({ success: false, message: err.message });
        } else {
            res.status(404).json({ success: false, message: "An unexpected error occurred" });
        }
    }
}