import * as CommentRepo from "../repository/Comment";
import type { Comment } from "../repository/Comment";

export async function addComment(
    content: string,
    authorId: string,
    postId: string,
    parentId?: string
): Promise<Comment> {
    if (!content.trim()) throw new Error("Comment cannot be empty");
    return CommentRepo.createComment({ content, authorId, postId, parentId });
}

export async function getPostComments(postId: string): Promise<Comment[]> {
    return CommentRepo.getCommentsByPost(postId);
}

export async function removeComment(id: string, authorId: string): Promise<boolean> {
    const deleted = await CommentRepo.deleteComment(id, authorId);
    if (!deleted) throw new Error("Comment not found or unauthorized");
    return true;
}