import * as Post from "../repository/Post.js";

// Create post

export async function createPost(data) {
  if (!data.title || !data.content) {
    throw new Error("Title and content are required");
  }
  return await Post.create(data);
}


 //GET all posts

export async function getAllPosts() {
  return await Post.getAll();
}

// GET post by ID
export async function getPostById(id) {
  const post = await Post.getById(id);
  if (!post) throw new Error("Post not found");
  return post;
}

// Update post

export async function updatePost(id, data) {
  const updated = await Post.update(id, data);
  if (!updated) throw new Error("Post not found");
  return updated;
}

//Delete post

export async function deletePost(id) {
  const deleted = await Post.remove(id);
  if (!deleted) throw new Error("Post not found");
  return true;
}
