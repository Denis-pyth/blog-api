import prisma from "../db/prisma";


import type { User } from "../generated/prisma";



export type { User };


export type SafeUser = Omit<User, "password">;

export async function findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
        where: { email },
    });
}

export async function findById(id: string): Promise<SafeUser | null> {
    return prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            username: true,
            bio: true,
            avatar: true,
            createdAt: true,
            updatedAt: true,
            password: false,
        },
    });
}

export async function createUser(
    email: string,
    username: string,
    hashedPassword: string
): Promise<User> {
    return prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
        },
    });
}