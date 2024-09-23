import { NextFunction, Request, Response } from "express";
import { PrismaLikePostRepository } from "../../../infrastructure/repositories/prisma-likepost";
import { UnauthenticatedError } from "../../../core/domain/errors/main";
const likePostRepository = new PrismaLikePostRepository()
export class LikePostController {
    async create(req:Request, res:Response, next:NextFunction) {
        // Faltaría crear el delete y hacer un switch aquí 🧠⬇️
        const {id} = req.params
        try {
            if(!req.user)throw new UnauthenticatedError("user jwt not set at likePost Controller")
            const post = await likePostRepository.create(parseInt(id),req.user.id)
            res.status(201).json(post)
        } catch (error) {
            next(error)
        }
    
    }
}