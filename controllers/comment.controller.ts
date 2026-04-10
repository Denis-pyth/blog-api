import { Request, Response } from "express";
import * as commentService from "../service/Comment.service";

export async function addComment(req: Request<{ postId: string }, {}, { content: string; parentId?: string }>, res: Response): Promise<void> {
    try {
        const { content, parentId } = req.body;
        const authorId = req.user!.id.toString();
        const { postId } = req.params;

        const comment = await commentService.addComment(content, authorId, postId, parentId);
        res.status(201).json({ success: true, data: comment });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ success: false, message: err.message });
        } else {
            res.status(400).json({ success: false, message: "An unexpected error occurred" });
        }
    }
}

export async function getComments(req: Request<{ postId: string }>, res: Response): Promise<void> {
    try {
        const comments = await commentService.getPostComments(req.params.postId);
        res.status(200).json({ success: true, data: comments });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, message: err.message });
        } else {
            res.status(500).json({ success: false, message: "An unexpected error occurred" });
        }
    }
}

export async function deleteComment(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
        const authorId = req.user!.id.toString();
        await commentService.removeComment(req.params.id, authorId);
        res.status(204).send();
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ success: false, message: err.message });
        } else {
            res.status(400).json({ success: false, message: "An unexpected error occurred" });
        }
    }
}