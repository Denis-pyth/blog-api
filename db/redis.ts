import Redis from "ioredis";
import { getEnvVar } from "../utils/env";

 

const globalForRedis = globalThis as unknown as {
    redis: Redis | undefined;
};

function createRedisClient(): Redis {
    const client = new Redis(getEnvVar("REDIS_URL"), {
               maxRetriesPerRequest: 3,         
        enableReadyCheck: true,          
        retryStrategy(times) {
                      if (times > 3) {
                console.error(" Redis connection failed after 3 retries");
                return null;  
            }
            return Math.min(times * 200, 2000);
        },
    });

    client.on("connect", () => console.log(" Redis connected"));
    client.on("error", (err) => console.error(" Redis error:", err.message));

    return client;
}

const redis = globalForRedis.redis ?? createRedisClient();

if (process.env.NODE_ENV !== "production") {
    globalForRedis.redis = redis;
}

export default redis;