import express from "express";
import routes from "./routes/routes.js";
import { initializeDB } from "./db/db.js";


const app = express();
app.use(express.json());

// Initialize DB
initializeDB();

app.use("/posts", routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
