import express, { Router } from "express";
import {
  getAllPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} from "../controllers/controller";

import { authenticate } from "../middleware/auth.middleware";
import { cacheMiddleware } from "../middleware/cache.middleware";

const router: Router = express.Router();
//public routes
router.get("/", cacheMiddleware(60), getAllPosts);
router.get("/:id", getPostById);
router.get("/slug/:slug", getPostBySlug);

//protected routes
router.post("/",authenticate, createPost);
router.put("/:id",authenticate, updatePost);
router.delete("/:id",authenticate, deletePost);

export default router;
