import { Request, Response } from "express";
import * as likeService from "../service/Like.service";

export async function toggleLike(req: Request<{ postId: string }>, res: Response): Promise<void> {
    try {
        const userId = req.user!.id.toString();
        const { postId } = req.params;
        const result = await likeService.toggleLike(userId, postId);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ success: false, message: err.message });
        } else {
            res.status(400).json({ success: false, message: "An unexpected error occurred" });
        }
    }
}