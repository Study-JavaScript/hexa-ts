import express from "express";
import swaggerUi from "swagger-ui-express";
import { setupRoutes } from "./interface/routes/main";
import { swaggerDocs } from "./interface/controllers/swagger";


const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

setupRoutes(app);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});