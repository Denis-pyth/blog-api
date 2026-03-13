import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUser, findByEmail, type User } from "../repository/User.js"

dotenv.config();

interface AuthResult {
  token: string;
  user: Omit<User, "password">
}

export async function registerUser(email: string, password: string): Promise<AuthResult> {
  const existingUser = await findByEmail(email);
  if (existingUser) throw new Error("Email already exists");
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser(email, password)
  
  const token = jwt.sign(
    { id: user.id, email: user.email },
    getEnvVar("JWT_SECRET"),
    { expiresIn: "1h" }
  );
   const {password: _password, ...safeUser} = user;
  return { token, user: safeUser};
}

export async function loginUser(email: string, password: string): Promise<AuthResult> {
  const user = await findByEmail(email);
  
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
     const {password: _password, ...safeUser} = user;
  return { token, user: safeUser};
}

function getEnvVar(key: string): string {
    const value = process.env[key];
    if (!value) {
        console.error(` Missing environment variable: ${key}`);
        process.exit(1);
    }
    return value;
  }
