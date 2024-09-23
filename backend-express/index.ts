import express from "express";
import { setupRoutes } from "./interface/routes/main";


const app = express();

setupRoutes(app);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});