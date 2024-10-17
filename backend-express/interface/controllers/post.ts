import { NextFunction, Request, Response } from "express";
import { PrismaPostRepository } from "../../../infrastructure/repositories/prisma-post";
import { FindDbError, UnauthorizedError } from "../../../domain/errors/main";
import { Post } from "../../../domain/entities/post";
import { UserJWT } from "../../express";

const postRepository = new PrismaPostRepository()


/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: El identificador único del post.
 *         title:
 *           type: string
 *           description: El título del post.
 *         content:
 *           type: string
 *           nullable: true
 *           description: El contenido del post.
 *         deleted:
 *           type: boolean
 *           description: Indica si el post está eliminado.
 *         authorId:
 *           type: integer
 *           description: El ID del autor que creó el post.
 */

export class PostController {
    constructor() {
        this.delete = this.delete.bind(this);
        this.hardDelete = this.hardDelete.bind(this);
        this.softDelete = this.softDelete.bind(this);
    }
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crear un nuevo post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título del post.
 *               content:
 *                 type: string
 *                 description: El contenido del post.
 *               authorId:
 *                 type: integer
 *                 description: El ID del autor que crea el post.
 *             required:
 *               - title
 *               - content
 *               - authorId
 *             example:
 *               title: "Titulo de Post de Prueba"
 *               content: "Este es el contenido del post de prueba del User2"
 *               authorId: 2
 *              
 *     responses:
 *       201:
 *         description: El post creado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         $ref: '#/components/responses/AuthError'
 *       403:
 *          $ref: '#/components/responses/BannedUserError'
 *      
 */
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { title, content } = req.body;
            if (!req.user) {
                res.status(401).json({ message: 'Sin autorización: Token no provisto' });
                throw new UnauthorizedError("user not set in jwt")
            }
            const userId = req.user.id;
            const post = await postRepository.create({ title, content }, userId);
            res.status(201).json(post);
        } catch (error) {
            next(error);
        }
    }
    /**
 * @swagger
 * /posts:
 *   get:
 *     summary: Recuperar todos los posts
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Una lista de posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
    async readAll(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const posts = await postRepository.readAll();
            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    } 
    /**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Actualizar un post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: El ID del post a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título actualizado del post.
 *               content:
 *                 type: string
 *                 description: El contenido actualizado del post.
 *               userId:
 *                 type: integer
 *                 description: El ID del usuario que realiza la actualización.
 *             required:
 *               - userId
 *             example:
 *               content: "Este es el contenido del post de prueba del User2 updated"
 *               userId: 2
 *     responses:
 *       200:
 *         description: El post actualizado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: No autorizado.
 */
    async update(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const { id } = req.params;
            const { title, content, userId } = req.body;
            if (!req.user || req.user.id !== parseInt(userId)) {
                res.status(401).json({ message: 'Unauthorized' });
                throw new UnauthorizedError(`user jwt ${!req.user ? "not set" : "invalid"}`)
            }

            const post = await postRepository.update(parseInt(id), { title, content });
            res.status(200).json(post);
        } catch (error) {
            next(error);
        }
    }

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Eliminar/restablecer un post
 *     description: Elimina o restablece un post, según su estado actual. Si se utiliza la version "soft", permite recuperar un Post eliminado, si se utiliza "hard" este no se podrá recuperar.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: El ID del post a eliminar.
 *         schema:
 *           type: integer
 *         required: true
 *       - name: type
 *         in: query
 *         description: El tipo de eliminación (suave o permanente).
 *         schema:
 *           type: string
 *           enum: [soft, hard]
 *         required: true
 *     responses:
 *       200:
 *         description: El post eliminado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post no encontrado.
 *       401:
 *         description: No autorizado.
 *       400:
 *         description: Tipo de eliminación inválido.
 */
    async delete(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const { id } = req.params;
            const post = await postRepository.readById(parseInt(id))
            if(!post){
                res.status(404).json({message: "Post not found"})
                throw new FindDbError("Post")
            }
            if(!req.user ){
                res.status(401).json({message: "Unauthorized"})
                throw new UnauthorizedError(`user jwt not set`)
            }
            const deleteType = req.query.type;
            if(deleteType === "hard"){
                this.hardDelete( parseInt(id),req.user,  res)
            } else if(deleteType === "soft") {
                this.softDelete(post, parseInt(id),req.user,  res)
            } else {
                res.status(400).json({message: "Invalid delete type"})
            }

        } catch (error) {
            next(error);
        }
    }
    private hardDelete = async (id: number, user: UserJWT, res: Response): Promise<void> => {
        if (user.role === "ADMIN") {
            const deletedPost = await postRepository.delete(id);
            res.status(200).json(deletedPost);
        } else {
            res.status(403).json({ message: "Forbidden" });
            throw new UnauthorizedError("user not authorized for hardDelete");
        }
    };
    
    private softDelete = async (post: Post, id: number, user: UserJWT, res: Response): Promise<void> => {
    
        if (user.id === post.authorId || user.role === "ADMIN") {
            const deletedPost = await postRepository.update(id, { deleted: !post.deleted });
            res.status(200).json(deletedPost);
        } else {
            res.status(403).json({ message: "Forbidden" });
            throw new UnauthorizedError("user not authorized for softDelete");
        }
    };
}