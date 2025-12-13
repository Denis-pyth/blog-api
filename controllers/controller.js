import * as postService from "../service/service.js";

/**
 * Create post
 */
export async function createPost(req, res) {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

/**
 * Get all posts
 */
export async function getAllPosts(req, res) {
  try {
    const posts = await postService.getAllPosts();
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * Get post by ID
 */
export async function getPostById(req, res) {
  try {
    const post = await postService.getPostById(req.params.id);
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
}

/**
 * Update post
 */
export async function updatePost(req, res) {
  try {
    const updated = await postService.updatePost(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

/**
 * Delete post
 */
export async function deletePost(req, res) {
  try {
    await postService.deletePost(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
}
