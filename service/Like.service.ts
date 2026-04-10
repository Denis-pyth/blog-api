import * as LikeRepo from "../repository/Like";

export async function toggleLike(userId: string, postId: string): Promise<{ liked: boolean; count: number }> {   
    const alreadyLiked = await LikeRepo.hasUserLiked(userId, postId);

    if (alreadyLiked) {
        await LikeRepo.unlikePost(userId, postId);
    } else {
        await LikeRepo.likePost(userId, postId);
    }

    const count = await LikeRepo.getLikeCount(postId);
    return { liked: !alreadyLiked, count };
}

export async function getLikeCount(postId: string): Promise<number> {
    return LikeRepo.getLikeCount(postId);
}