import { NextFunction, Request, Response } from "express";
import { PrismaPostRepository } from "../../../infrastructure/repositories/prisma-post";
import { FindDbError, UnauthorizedError } from "../../../domain/errors/main";
import { Post } from "../../../domain/entities/Post";
import { UserJWT } from "../../express";

const postRepository = new PrismaPostRepository()

export class PostController {
    constructor() {
        this.delete = this.delete.bind(this);
        this.hardDelete = this.hardDelete.bind(this);
        this.softDelete = this.softDelete.bind(this);
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { title, content } = req.body;
            if (!req.user) {
                res.status(401).json({ message: 'Unauthorized' });
                throw new UnauthorizedError("user not set in jwt")
            }
            const userId = req.user.id;
            const post = await postRepository.create({ title, content }, userId);
            res.status(201).json(post);
        } catch (error) {
            next(error);
        }
    }
    async readAll(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const posts = await postRepository.readAll();
            res.status(200).json(posts);
        } catch (error) {
            next(error);
        }
    } 
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