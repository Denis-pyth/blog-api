import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config();
import routes from "./routes/routes";
import authRoutes from "./routes/auth.routes";
import "./db/redis";
import { rateLimitMiddleware } from "./middleware/ratelimit.middleware";

const app: Application = express();

app.use(express.json());
app.use(rateLimitMiddleware);

app.use("/auth", authRoutes);
app.use("/posts", routes);
 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));