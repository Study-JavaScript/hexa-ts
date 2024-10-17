


import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv"

import { ReadAll, ReadByEmail, ReadById } from "../../../application/usecases/atomic/user"
import { FindDbError, InvalidUrlError, SetEnvError, UnauthorizedError } from "../../../domain/errors/main"
import { PrismaUserRepository } from "../../../infrastructure/repositories/prisma-user";
import { User } from "../../../domain/entities/user";

export const userRepository = new PrismaUserRepository()
dotenv.config()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id: 
 *           type: integer
 *         password: 
 *           type: string
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         role:
 *           type: string
 *         banned:
 *           type: boolean
 *       example:
 *         id: 1
 *         email: "user@example.com"
 *         name: "John Doe"
 *         role: "USER"
 *         banned: false
 *         password: "123somehashedword"
 */

export class UserController {
    constructor() {
        this.read = this.read.bind(this);
        this.readerBy = this.readerBy.bind(this);
    }

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *             required:
 *               - email
 *               - password
 *             example: 
 *               email: "usuario2@prueba.com"
 *               password: "usuarioprueba2" 
 * 
 *             examples: # no esta funcionando
 *               admin:
 *                 summary: Ejemplo de login para administrador
 *                 value: 
 *                   email: "firstAdmin@prisma.io"
 *                   password: "firstAdmin"
 *               user:
 *                 summary: Ejemplo de login para usuario regular
 *                 value:
 *                   email: "usuario2@prueba.com"
 *                   password: "usuarioprueba2"     
 *   
 *     responses:
 *       200:
 *         description: Token generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: El token JWT para autenticación
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *             example:
 *               message: "Credenciales inválidas"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *             example:
 *               message: "Error interno del servidor"
 */

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { email, password } = req.body;
        try {
            const user = await userRepository.readByEmail(email);
            if (user && (await bcrypt.compare(password, user.password))) {
                const secret = process.env.JWT_SECRET;
                if (!secret) throw new SetEnvError("JWT_SECRET");
                const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(401).json({ message: 'Credenciales inválidas' });
            }
        } catch (error) {
            next(error);
        }
    }


    /**
     * @swagger
     * /signup:
     *   post:
     *     summary: Registrar un nuevo usuario
     *     tags: [Autenticación]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Nombre del usuario
     *               email:
     *                 type: string
     *                 description: Correo electrónico del usuario
     *               password:
     *                 type: string
     *                 description: Contraseña del usuario
     *             required:
     *               - name
     *               - email
     *               - password
     *             example:
     *               name: "John Doe"
     *               email: "usuario@example.com"
     *               password: "password123"
     *     responses:
     *       201:
     *         description: Usuario creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       400:
     *         description: Error en los datos ingresados
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Detalles del error
     *             example:
     *               message: "El correo electrónico ya está en uso"
     *       500:
     *         description: Error interno del servidor
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Mensaje de error
     *             example:
     *               message: "Error interno del servidor"
     */

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await userRepository.create({ name, email, password: hashedPassword });
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: 'El correo electrónico ya está en uso' });
            } else {
                next(error);
            }
        }
    }


    /**
     * @swagger
     * /users/{type}:
     *   get:
     *     summary: Obtener usuarios filtrados por tipo (id o email)
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: type
     *         schema:
     *           type: string
     *         required: true
     *         description: Tipo de búsqueda ('id' o 'email')
     *       - in: query
     *         name: q
     *         schema:
     *           type: string
     *         required: true
     *         description: Parámetro de búsqueda
     *     security:
     *       - bearerAuth: []  # Esta línea añade la seguridad JWT solo a esta ruta
     *     responses:
     *       200:
     *         description: Usuario encontrado
     *       400:
     *         description: Falta el parámetro de búsqueda o tipo inválido
     *       404:
     *         description: Usuario no encontrado
     */
    async read(req: Request, res: Response, next: NextFunction): Promise<void> {
        const type = req.params.type;
        const searchParam = req.query.q as string | undefined;
        try {
            if (!searchParam) {
                res.status(400).json({ message: "Missing search parameter" });
                throw new InvalidUrlError("Missing search parameter in read");
            }
            let user: User | null = null;
            if (type === "id") {
                const r = new ReadById(userRepository);
                user = await this.readerBy(parseInt(searchParam), r);
            } else if (type === "email") {
                const r = new ReadByEmail(userRepository);
                user = await this.readerBy(searchParam, r);
            } else {
                res.status(400).json({ message: "Invalid read type" });
            }
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            next(error);
        }
    }


    private readerBy(searchParam: string | number, r: ReadByEmail | ReadById): Promise<User | null> {
        if (typeof searchParam === "string") {
            const reader = r as ReadByEmail; // En este caso, r será de tipo ReadByEmail
            return reader.execute(searchParam);
        } else {
            const reader = r as ReadById; // En este caso, r será de tipo ReadById
            return reader.execute(searchParam);
        }
    }

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar datos de usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar (que ha iniciado sesión).
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
 *                 description: Nuevo nombre del usuario
 *               email:
 *                 type: string
 *                 description: Nuevo correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *           example:
 *             name: "usuario-prueba2"
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del usuario actualizado
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario actualizado
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario actualizado
 *       403:
 *         description: Acceso prohibido, el usuario no está autorizado a realizar esta acción
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                 message: "Forbidden"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                 message: "User not found"
 *       401:
 *         description: Usuario no autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                 message: "Unauthorized"
 */

async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, email, password } = req.body;
    let hashedPassword;
    if (password) hashedPassword = await bcrypt.hash(password, 10);
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            throw new UnauthorizedError("user not set in jwt");
        }
        if (req.user.id !== parseInt(req.params.id)) {
            res.status(403).json({ message: 'Forbidden' });
            throw new UnauthorizedError("user not authorized");
        }

        const user = await userRepository.update(parseInt(req.params.id), { name, email, password: hashedPassword });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
}

    /**
 * @swagger
 * /admins/users:
 *   get:
 *     summary: Obtener todos los usuarios (Admin)
 *     tags: [Admin Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del usuario
 *                   name:
 *                     type: string
 *                     description: Nombre del usuario
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del usuario
 *                   role:
 *                     type: string
 *                     description: Rol del usuario (ej. ADMIN, USER)
 *               example:
 *                 - id: 1
 *                   name: "Admin User"
 *                   email: "admin@ejemplo.com"
 *                   role: "ADMIN"
 *                 - id: 2
 *                   name: "Regular User"
 *                   email: "user@ejemplo.com"
 *                   role: "USER"
 *       403:
 *         description: Acceso prohibido; se requiere acceso de administrador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                 message: "Forbidden: Admin access required"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                 message: "Error interno del servidor"
 */
async readAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const ra = new ReadAll(userRepository);
    try {
        const users = await ra.execute();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

    /**
 * @swagger
 * /admins/banned/{id}:
 *   patch:
 *     summary: Actualizar estado de baneo de usuario
 *     tags: [Admin Users]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario cuyo estado de baneo se va a actualizar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estado de baneo actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del usuario
 *                 banned:
 *                   type: boolean
 *                   description: Nuevo estado de baneo del usuario
 *               example:
 *                 id: 1
 *                 banned: true  # Indica que el usuario ha sido baneado
 *       401:
 *         description: No autorizado; se requiere autenticación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                 message: "Unauthorized"
 *       403:
 *         description: Acceso prohibido; se requiere acceso de administrador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                 message: "Forbidden"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                 message: "User not exists"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                 message: "Error interno del servidor"
 */
async updateBanned(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            throw new UnauthorizedError("user not set in jwt");
        }
        if (req.user.role !== "ADMIN") {
            res.status(403).json({ message: 'Forbidden' });
            throw new UnauthorizedError("user not authorized");
        }
        const user = await userRepository.readById(parseInt(req.params.id));
        if (!user) {
            res.status(404).json({ message: 'User not exists' });
            throw new FindDbError("user");
        }

        const updatedUser = await userRepository.update(parseInt(req.params.id), { banned: !user.banned });
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
}

}