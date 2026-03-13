import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

interface DBConfig {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
    max: number;              // max connections in pool
    idleTimeoutMillis: number;
    connectionTimeoutMillis: number;
}


function getEnvVar(key: string): string {
    const value = process.env[key];
    if (!value) {
        console.error(` Missing environment variable: ${key}`);
        process.exit(1);
    }
    return value;
}


const dbConfig: DBConfig = {
    user: getEnvVar("PG_USER"),
    host: getEnvVar("PG_HOST"),
    database: getEnvVar("PG_DATABASE"),
    password: getEnvVar("PG_PASSWORD"),
    port: parseInt(getEnvVar("PG_PORT"), 10), 
    max: 20,                        // max 20 simultaneous DB connections
    idleTimeoutMillis: 30000,       // close idle connections after 30s
    connectionTimeoutMillis: 2000,  // fail fast if can't connect in 2s
};

const pool = new pg.Pool(dbConfig);

async function initializeDB(): Promise<void> {
    try {
        await pool.query("SELECT NOW()");
        console.log("PostgreSQL connection established successfully.");
        const createPostsTable = `
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                author VARCHAR(100) DEFAULT 'Anonymous',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;

        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(400) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `;

        await pool.query(createPostsTable);
        await pool.query(createUsersTable);
        console.log("Database initialized.");
    } catch (error) {
        if (error instanceof Error) {
            console.error(" Error connecting or initializing the database:", error.message);
        } else {
            console.error(" Unknown error during DB initialization:", error);
        }
        process.exit(1);
    }
}

export default pool;
export { initializeDB };