import { Router } from "express";
import { UserController } from "../controllers/user";

const controller = new UserController();
const NoAuthenticateRouter = Router();
const UserRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication routes
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a usuario
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 */
NoAuthenticateRouter.post("/login", controller.login);

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Registro de nuevo usuario
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Datos inválidos
 */
NoAuthenticateRouter.post("/signup", controller.register);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management routes
 */

/**
 * @swagger
 * /users/{type}:
 *   get:
 *     summary: Obtener usuarios filtrados por tipo
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Tipo de usuarios a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       404:
 *         description: No se encontraron usuarios
 */
UserRouter.get("/users/:type", controller.read);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar datos de usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
UserRouter.put("/users/:id", controller.update);

/**
 * @swagger
 * /admins/users:
 *   get:
 *     summary: Obtener todos los usuarios (Admin)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
 */
UserRouter.get("/admins/users", controller.readAll);

/**
 * @swagger
 * /admins/banned/{id}:
 *   put:
 *     summary: Actualizar estado de baneo de usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
UserRouter.put("/admins/banned/:id", controller.updateBanned);

export { UserRouter, NoAuthenticateRouter };
