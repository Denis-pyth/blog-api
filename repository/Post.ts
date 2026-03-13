import pool from "../db/db";

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  Created_at: Date;
  Updated_at?: Date

}

export interface CreatePostInput {
  title: string;
  content: string;
  author: string;
}

export interface UpdatePostInput {
  title: string;
  content: string;
  author: string;
}


// Create post
export async function create(input: CreatePostInput): Promise<Post> {
  const query = `
    INSERT INTO posts (title, content, author)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [input.title, input.content, input.author || "Anonymous"];
  const result = await pool.query<Post>(query, values);
  return result.rows[0];
}

// GET all posts
export async function getAll(): Promise<Post[]> {
  const result = await pool.query<Post>(
    "SELECT * FROM posts ORDER BY created_at DESC"
  );
  return result.rows;
}

//GET post by ID
export async function getById(id: number): Promise<Post | null> {
  const result = await pool.query<Post>(
    "SELECT * FROM posts WHERE id = $1",
    [id]
  );
  return result.rows[0] ?? null;
}

// Update post

export async function update(id: number, input: UpdatePostInput): Promise<Post | null> {
  const query = `
    UPDATE posts
    SET title = $1,
        content = $2,
        author = $3,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *;
  `;
  const values = [input.title, input.content, input.author, id];
  const result = await pool.query<Post>(query, values);
  return result.rows[0] ?? null;
}

// Delete post
export async function remove(id: number): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM posts WHERE id = $1 RETURNING id",
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}
