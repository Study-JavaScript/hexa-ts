import { LikePostRepository } from "application/repositories/likepost";
import { LikePost } from "domain/entities/LikePost";

abstract class UseCaseBase {
    constructor(protected likePostRepository: LikePostRepository){}
}
export class CreateLikePost extends UseCaseBase {
    async execute(postId: number, userId: number): Promise<LikePost> {
        return await this.likePostRepository.create(postId, userId);
    }
}