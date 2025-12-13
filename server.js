import express from "express";
import bodyParser from "body-parser";
import { pool, initializeDB } from "./db.js";
import routes from "./routes/routes.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/posts", routes);

  


// START SERVER
initializeDB().then(() => {
  app.listen(port, () => {
    console.log(`API is running on port ${port}`);
  });
});
