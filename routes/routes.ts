import express, { Router } from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from "../controllers/controller";

import { authenticate } from "../middleware/auth.middleware";

const router: Router = express.Router();
//public routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);

//protected routes
router.post("/",authenticate, createPost);
router.put("/:id",authenticate, updatePost);
router.delete("/:id",authenticate, deletePost);

export default router;
