import pool from "../db/db";


export interface User {
    id: number;
    email: string;
    password: string;
    created_at: Date;
}


export async function findByEmail(email: string): Promise<User | null> {
    const result = await pool.query<User>(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    return result.rows[0] ?? null;
}

export async function createUser(email: string, hashedPassword: string): Promise<User> {
    const result = await pool.query<User>(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at",
        [email, hashedPassword]
    );
    return result.rows[0];
}