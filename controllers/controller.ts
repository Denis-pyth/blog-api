import * as postService from "../service/service";
import { Request, Response } from "express";
import type { CreatePostInput, UpdatePostInput } from "../repository/Post";




/**
 * Create post
 */
export async function createPost(req: Request<{},{}, CreatePostInput>, res: Response):Promise<void> {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    if ( err instanceof Error){
    res.status(400).json({ success: false, message: err.message });
    } else {
      res.status(400).json({ success : false, message: "An unexpected error occured"});
    }
  }
}

/**
 * Get all posts
 */
export async function getAllPosts(req: Request, res: Response): Promise<void> {
  try {
    const posts = await postService.getAllPosts();
    res.json({ success: true, data: posts });
  } catch (err) {
    if ( err instanceof Error){
    res.status(500).json({ success: false, message: err.message });
    } else {
      res.status(500).json({ success : false, message: "An unexpected error occured"});
    }
  }
}

/**
 * Get post by ID
 */
export async function getPostById(req: Request<{id: string}>, res: Response): Promise<void> {
  try{
       const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ success: false, message: "Invalid post ID" });
            return;
        }
    const post = await postService.getPostById(id);
    res.json({ success: true, data: post });
  } catch (err) {
    if ( err instanceof Error){
    res.status(404).json({ success: false, message: err.message });
    } else {
      res.status(404).json({ success : false, message: "An unexpected error occured"});
    }
  }
}

/**
 * Update post
 */
export async function updatePost(req: Request<{id: string}, {}, UpdatePostInput>, res: Response): Promise<void> {
  try { const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ success: false, message: "Invalid post ID" });
            return;
        }
    const updated = await postService.updatePost(id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    if ( err instanceof Error){
    res.status(400).json({ success: false, message: err.message });
    } else {
      res.status(400).json({ success : false, message: "An unexpected error occured"});
    }
  }
}


/**
 * Delete post
 */
export async function deletePost(req: Request<{id: string} >, res: Response) {
  try { const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(400).json({ success: false, message: "Invalid post ID" });
            return;
        }
    await postService.deletePost(id);
    res.status(204).send();
    } catch (err) {
    if ( err instanceof Error){
    res.status(400).json({ success: false, message: err.message });
    } else {
      res.status(400).json({ success : false, message: "An unexpected error occured"});
    }
  }
}
