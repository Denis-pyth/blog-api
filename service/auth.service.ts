import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUser, findByEmail, type User } from "../repository/User";
import { getEnvVar } from "../utils/env";

dotenv.config();



interface AuthResult {
    token: string;
    user: Omit<User, "password">;
}

export async function registerUser(
    email: string,
    username: string,  
    password: string
): Promise<AuthResult> {
    const existingUser = await findByEmail(email);
    if (existingUser) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(email, username, hashedPassword);

    const token = jwt.sign(
        { id: user.id, email: user.email },
        getEnvVar("JWT_SECRET"),
        { expiresIn: "1h" }
    );

    const { password: _password, ...safeUser } = user;
    return { token, user: safeUser };
}

export async function loginUser(
    email: string,
    password: string
): Promise<AuthResult> {
    const user = await findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { id: user.id, email: user.email },
        getEnvVar("JWT_SECRET"),  
        { expiresIn: "1h" }
    );

    const { password: _password, ...safeUser } = user;
    return { token, user: safeUser };
}