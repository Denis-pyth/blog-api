import * as authService from "../service/auth.service";
import { Request, Response } from "express";
import { blacklistToken } from "../middleware/session.middleware";

interface RegisterBody {
    email: string;
    username: string;
    password: string;
}

interface LoginBody {
    email: string;
    password: string;
}


export async function register(req: Request<{},{}, RegisterBody>, res: Response): Promise<void> {
  try {
    const { email, username, password } = req.body;
    const user = await authService.registerUser(email, username, password);
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

export async function logout(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const token = req.token;
        if (!token) {
            res.status(400).json({ success: false, message: "No token found" });
            return;
        }
       
        const decoded = req.user;
        const now = Math.floor(Date.now() / 1000);
        const expiresIn = decoded?.exp ? decoded.exp - now : 3600;

        await blacklistToken(token, expiresIn);
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, message: err.message });
        } else {
            res.status(500).json({ success: false, message: "An unexpected error occurred" });
        }
    }
}