import express from "express";
import bodyParser from "body-parser";
import { pool, initializeDB } from "./db.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CREATE POST
app.post("/posts", async (req, res) => {
  const { title, content, author } = req.body;

  const query = `
    INSERT INTO posts (title, content, author)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [title, content, author || "Anonymous"];

  try {
    const result = await pool.query(query, values);
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create post.",
      error: err.message
    });
  }
});


// READ ALL POSTS
app.get("/posts", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve posts.",
      error: err.message
    });
  }
});


// READ SINGLE POST
app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

    if (!result.rows.length) {
      return res
        .status(404)
        .json({ success: false, message: `Post with id ${id} not found.` });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve post.",
      error: err.message
    });
  }
});


// UPDATE POST
app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  const query = `
    UPDATE posts
    SET title = $1,
        content = $2,
        author = $3,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING *;
  `;
  const values = [title, content, author || "Anonymous", id];

  try {
    const result = await pool.query(query, values);

    if (!result.rows.length) {
      return res
        .status(404)
        .json({ success: false, message: `Post with id ${id} not found.` });
    }

    res.json({
      success: true,
      message: "Post updated successfully.",
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update post.",
      error: err.message
    });
  }
});


// DELETE POST
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    
    const result = await pool.query(
      "DELETE FROM posts WHERE id = $1 RETURNING id",
      [id]
    );

    if (!result.rows.length) {
      return res
        .status(404)
        .json({ success: false, message: `Post with id ${id} not found.` });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete post.",
      error: err.message
    });
  }
});


// START SERVER
initializeDB().then(() => {
  app.listen(port, () => {
    console.log(`API is running on port ${port}`);
  });
});
