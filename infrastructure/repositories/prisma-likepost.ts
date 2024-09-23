import { PrismaClientConfig } from "../connectors/prisma-db";
import { LikePostRepository } from "../../core/application/repositories/likepost";

export class PrismaLikePostRepository extends PrismaClientConfig implements LikePostRepository {
    async create(postId: number, userId: number): Promise<Object> {
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