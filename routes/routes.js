import express from "express";
import { createPost, deletePost, getPostById, updatePost, getAllPosts } from "../controller/controller.js";


const router = express.Router();

router.get("/", getAllPosts);
router.get("/posts/:id", getPostById);
router.post("/posts", createPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;