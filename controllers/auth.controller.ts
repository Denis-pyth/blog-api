import * as authService from "../service/auth.service.js";
import { Request, Response } from "express";

interface RegisterBody {
    email: string;
    password: string;
}

interface LoginBody {
    email: string;
    password: string;
}


export async function register(req: Request<{},{}, RegisterBody>, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await authService.registerUser(email, password);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ success: false, message: err.message });
        } else {
            res.status(400).json({ success: false, message: "An unexpected error occurred" });
        }
    }
}    

export async function login(req: Request<{},{}, LoginBody>, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.json({ success: true, data: result });
  } catch (err) {
              if (err instanceof Error) {
            res.status(400).json({ success: false, message: err.message });
        } else {
            res.status(400).json({ success: false, message: "An unexpected error occurred" });
        }
    }
}
