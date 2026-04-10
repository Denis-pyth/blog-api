import express, { Router } from "express";
import { toggleLike } from "../controllers/like.controller";
import { authenticate } from "../middleware/auth.middleware";

const router: Router = express.Router({ mergeParams: true });

router.post("/", authenticate, toggleLike); 

export default router;