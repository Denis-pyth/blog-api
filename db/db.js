import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,   
    port: process.env.PG_PORT,
});

async function initializeDB() {
    try {
        await pool.query("SELECT NOW()");
        console.log("PostgreSQL connection established successfully.");

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                author VARCHAR(100) DEFAULT 'Anonymous',  -- fixed quotes
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;
        const createUserTable = `
         CREATE TABLE users   (
            id SERIAL PRIMARY KEY,
            email VARCHAR(400) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            Created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
         );
        `;

        await pool.query(createTableQuery);
        await pool.query(createUserTable);
        console.log("Database Initialized.");
    } catch (error) {
        console.error("Error connecting or initializing the database:", error.message);
        process.exit(1);
    }
}

export default pool;
export {  initializeDB };
