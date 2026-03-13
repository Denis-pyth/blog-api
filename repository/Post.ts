import pool from "../db/db.js";

// Create post
export async function create({ title, content, author }) {
  const query = `
    INSERT INTO posts (title, content, author)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [title, content, author || "Anonymous"];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// GET all posts
export async function getAll() {
  const result = await pool.query(
    "SELECT * FROM posts ORDER BY created_at DESC"
  );
  return result.rows;
}

//GET post by ID
export async function getById(id) {
  const result = await pool.query(
    "SELECT * FROM posts WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

// Update post

export async function update(id, { title, content, author }) {
  const query = `
    UPDATE posts
    SET title = $1,
        content = $2,
        author = $3,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *;
  `;
  const values = [title, content, author, id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

// Delete post
export async function remove(id) {
  const result = await pool.query(
    "DELETE FROM posts WHERE id = $1 RETURNING id",
    [id]
  );
  return result.rowCount > 0;
}
