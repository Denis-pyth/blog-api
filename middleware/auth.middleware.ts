import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getEnvVar } from "../utils/env";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

interface JwtPayload {
    id: number;
    email: string;
    iat?: number;
    exp?: number;
}


export function authenticate(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "No token provided" });
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Malformed token" });
        return;
    }

    try {
        const decoded = jwt.verify(token, getEnvVar("JWT_SECRET")) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: "Token expired" });
        } else if (err instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: "Invalid token" });
        } else {
            res.status(401).json({ message: "Authentication failed" });
        }
    }
}