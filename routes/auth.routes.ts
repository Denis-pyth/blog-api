import express, { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { RegisterSchema, LoginSchema } from "../schemas/auth.schema";


const router: Router = express.Router();
router.post("/register",  validate(RegisterSchema), register);
router.post("/login", validate(LoginSchema), login);
router.post("/logout", authenticate, logout);

export default router;
