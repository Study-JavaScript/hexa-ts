import { LikePost } from "domain/entities/LikePost"

export type LikePostRepository = {
    create: (postId: number, userId: number) => Promise<LikePost>
}