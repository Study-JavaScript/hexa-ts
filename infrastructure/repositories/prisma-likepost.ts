import { PrismaClientConfig } from "../connectors/prisma-db";
import { LikePostRepository } from "../../core/application/repositories/likepost";
import { LikePost } from "../../domain/entities/LikePost";

export class PrismaLikePostRepository extends PrismaClientConfig implements LikePostRepository {
    async create(postId: number, userId: number): Promise<LikePost> {
        return await this.prisma.likePost.create({
            data: {
                post: {
                    connect: { id: postId }
                },
                user: {
                    connect: { id: userId }
                }
            }
        });
    }
}