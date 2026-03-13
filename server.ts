import express, { Application } from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import authRoutes from "./routes/auth.routes.js";
import { initializeDB } from "./db/db.js";

dotenv.config();

const app: Application = express();

app.use(express.json());

// Initialize DB
initializeDB();

app.use("/auth", authRoutes);
app.use("/posts", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));