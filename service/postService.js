import * as Post from "../repository/Post.js";

export async function createPost(postData) {
  const { title, content, author } = postData;
  if (!data.title || !data.content) {
    throw new Error("Title and content are required");
  }
  return await Post.create(postData);
}

export async function getAllPosts() {
  return await Post.getAll();
}

export async function getPostById(id) {
  const post = await Post.getById(id);
  if (!post) throw new Error("Post not found");
  return post;
}

export async function updatePost(id, data) {
  const updated = await Post.update(id, data);
  if (!updated) throw new Error("Post not found");
  return updated;
}

export async function deletePost(id) {
  const deleted = await Post.remove(id);
  if (!deleted) throw new Error("Post not found");
  return true;
}
