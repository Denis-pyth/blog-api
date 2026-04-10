import prisma from "../db/prisma";
import type { Comment } from "../generated/prisma";

export type { Comment };

export interface CreateCommentInput {
    content: string;
    authorId: string;
    postId: string;
    parentId?: string; 
}

export async function createComment(input: CreateCommentInput): Promise<Comment> {
    return prisma.comment.create({
        data: {
            content: input.content,
            author: { connect: { id: input.authorId } },
            post: { connect: { id: input.postId } },           
            ...(input.parentId && {
                parent: { connect: { id: input.parentId } }
            }),
        },
    });
}

export async function getCommentsByPost(postId: string): Promise<Comment[]> {
    return prisma.comment.findMany({
        where: {
            postId,
            parentId: null, // only top level comments — replies are nested inside
        },
        include: {            
            author: {
                select: { id: true, username: true, avatar: true }
            },
            replies: {
                include: {
                    author: {
                        select: { id: true, username: true, avatar: true }
                    }
                }
            }
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function deleteComment(id: string, authorId: string): Promise<boolean> {
    try {
        await prisma.comment.delete({
            where: {
                id,
                authorId,  
            },
        });
        return true;
    } catch {
        return false;
    }
}