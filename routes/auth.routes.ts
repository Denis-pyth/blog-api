import express, { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";


const router: Router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);

export default router;
