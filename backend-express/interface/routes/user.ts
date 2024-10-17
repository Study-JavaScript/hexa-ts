import { Router } from "express";
import { UserController } from "../controllers/user";

const controller = new UserController();
const NoAuthenticateRouter = Router();
const UserRouter = Router();



NoAuthenticateRouter.post("/login", controller.login);
NoAuthenticateRouter.post("/signup", controller.register);





UserRouter.get("/users/:type", controller.read);
UserRouter.put("/users/:id", controller.update);


UserRouter.get("/admins/users", controller.readAll);
UserRouter.patch("/admins/banned/:id", controller.updateBanned);

export { UserRouter, NoAuthenticateRouter };
