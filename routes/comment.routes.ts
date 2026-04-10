import express, { Router } from "express";
import { addComment, getComments, deleteComment } from "../controllers/Comment.controller";
import { authenticate } from "../middleware/auth.middleware";

const router: Router = express.Router({ mergeParams: true });
 

router.get("/", getComments);                        
router.post("/", authenticate, addComment);           
router.delete("/:id", authenticate, deleteComment);   

export default router;