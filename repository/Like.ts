import prisma from "../db/prisma";

export async function likePost(userId: string, postId: string): Promise<boolean> {
    try {
        await prisma.like.create({
            data: {
                user: { connect: { id: userId } },
                post: { connect: { id: postId } },
            },
        });
        return true;
    } catch {  
        return false;
    }
}

export async function unlikePost(userId: string, postId: string): Promise<boolean> {
    try {
        await prisma.like.delete({
            where: {
                userId_postId: { userId, postId },  
            },
        });
        return true;
    } catch {
        return false;
    }
}

export async function getLikeCount(postId: string): Promise<number> {   
    return prisma.like.count({
        where: { postId },
    });
}

export async function hasUserLiked(userId: string, postId: string): Promise<boolean> {
    const like = await prisma.like.findUnique({
        where: {
            userId_postId: { userId, postId },
        },
    });
    return like !== null;
}