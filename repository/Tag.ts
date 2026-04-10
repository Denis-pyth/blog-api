import prisma from "../db/prisma";
import type { Tag } from "../generated/prisma";
import slugify from "slugify";

export type { Tag };

export async function findOrCreateTag(name: string): Promise<Tag> {
    const slug = slugify(name, { lower: true, strict: true });   
    return prisma.tag.upsert({
        where: { slug },
        update: {}, 
        create: { name, slug },
    });
}

export async function getPostTags(postId: string): Promise<Tag[]> {
    const post = await prisma.post.findUnique({
        where: { id: postId },
        include: { tags: true },
    });
    return post?.tags ?? [];
}

export async function addTagsToPost(postId: string, tagNames: string[]): Promise<void> {    
    const tags = await Promise.all(tagNames.map(findOrCreateTag));

        await prisma.post.update({
        where: { id: postId },
        data: {
            tags: {
                connect: tags.map(tag => ({ id: tag.id })),
            },
        },
    });
}