import { Router } from "express";
import { UserController } from "../controllers/user";

const controller = new UserController();
const NoAuthenticateRouter = Router();
const UserRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Rutas de autenticación
 */

NoAuthenticateRouter.post("/login", controller.login);
NoAuthenticateRouter.post("/signup", controller.register);


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rutas de manejo de perfil para usuarios activos.
 */


UserRouter.get("/users/:type", controller.read);
UserRouter.put("/users/:id", controller.update);
/**
 * @swagger
 * tags:
 *   name: Admin Users
 *   description: Rutas de manejo de perfil de usuarios activos para administradores.
 */

UserRouter.get("/admins/users", controller.readAll);
UserRouter.patch("/admins/banned/:id", controller.updateBanned);

export { UserRouter, NoAuthenticateRouter };
