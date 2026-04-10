import { Request, Response, NextFunction } from "express";
import redis from "../db/redis"; 

const WINDOW_SECONDS = 60;      
const MAX_REQUESTS = 100;        

export async function rateLimitMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {  
    const ip = (req.headers["x-forwarded-for"] as string) || req.ip || "unknown";
    const key = `ratelimit:${ip}`;

    try {   
        const requests = await redis.incr(key);
 
        if (requests === 1) {
            await redis.expire(key, WINDOW_SECONDS);
        }
 
        const ttl = await redis.ttl(key);
        res.setHeader("X-RateLimit-Limit", MAX_REQUESTS);
        res.setHeader("X-RateLimit-Remaining", Math.max(0, MAX_REQUESTS - requests));
        res.setHeader("X-RateLimit-Reset", ttl);

        if (requests > MAX_REQUESTS) {
            res.status(429).json({
                success: false,
                message: "Too many requests — please try again later",
                retryAfter: ttl,
            });
            return;            
        }

        next();
    } catch (err) { 
        console.error("Rate limit error:", err);
        next();
    }
}