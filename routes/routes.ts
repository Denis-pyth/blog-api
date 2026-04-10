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
import { validate } from "../middleware/validate.middleware";
import { CreatePostSchema, UpdatePostSchema } from "../schemas/post.schema";
import commentRoutes from "./comment.routes";
import likeRoutes from "./like.routes";

const router: Router = express.Router();
//public routes
router.get("/", cacheMiddleware(60), getAllPosts);
router.get("/:id", getPostById);
router.get("/slug/:slug", getPostBySlug);

//protected routes
router.post("/",authenticate, validate(CreatePostSchema), createPost);
router.put("/:id",authenticate, validate(UpdatePostSchema), updatePost);
router.delete("/:id",authenticate, deletePost);

//nested routes
router.use("/:postId/comments", commentRoutes);
router.use("/:postId/likes", likeRoutes);

export default router;
