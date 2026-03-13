import express, { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";


router.post("/register", register);
router.post("/login", login);

export default router;
