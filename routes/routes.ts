import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from "../controllers/controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();
//public routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);

//protected routes
router.post("/",authenticate, createPost);
router.put("/:id",authenticate, updatePost);
router.delete("/:id",authenticate, deletePost);

export default router;
