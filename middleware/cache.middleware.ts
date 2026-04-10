import { Request, Response, NextFunction } from "express";
import redis from "../db/redis"; 

const CACHE_TTL = 60;  

export function cacheMiddleware(ttl: number = CACHE_TTL) { 
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {     
        const key = `cache:${req.originalUrl}`;
        try {
            const cached = await redis.get(key);

            if (cached) {          
                console.log(` Cache hit: ${key}`);
                res.status(200).json(JSON.parse(cached));
                return;
            }
     
            console.log(` Cache miss: ${key}`);
            const originalJson = res.json.bind(res);

            res.json = (body: unknown) => {               
                if (res.statusCode === 200) {
                    redis.setex(key, ttl, JSON.stringify(body))
                        .catch(err => console.error("Cache set error:", err));
                }
                return originalJson(body);
            };

            next();
        } catch (err) {           
            console.error("Cache middleware error:", err);
            next();
        }
    };
}

 
export async function invalidatePostsCache(): Promise<void> {
    try {
        await redis.del("cache:/posts");
        console.log(" Posts cache invalidated");
    } catch (err) {
        console.error("Cache invalidation error:", err);
    }
}