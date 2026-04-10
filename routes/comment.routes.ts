import express, { Router } from "express";
import { addComment, getComments, deleteComment } from "../controllers/Comment.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { CreateCommentSchema } from "../schemas/comment.schema";

const router: Router = express.Router({ mergeParams: true });
 

router.get("/", getComments);                        
router.post("/", authenticate,validate(CreateCommentSchema), addComment);           
router.delete("/:id", authenticate, deleteComment);   

export default router;