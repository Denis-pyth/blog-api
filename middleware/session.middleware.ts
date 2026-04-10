import redis from "../db/redis"; 

export async function blacklistToken(token: string, expiresIn: number): Promise<void> { 
    await redis.setex(`blacklist:${token}`, expiresIn, "true");
    console.log(" Token blacklisted");
}

export async function isTokenBlacklisted(token: string): Promise<boolean> { 
    const result = await redis.get(`blacklist:${token}`);
    return result !== null;
}