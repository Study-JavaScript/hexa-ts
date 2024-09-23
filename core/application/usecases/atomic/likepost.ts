import { LikePostRepository } from "@core/application/repositories/likepost";

abstract class UseCaseBase {
    constructor(protected likePostRepository: LikePostRepository){}
}
export class LikePost extends UseCaseBase {
    async execute(postId: number, userId: number): Promise<Object> {
        return await this.likePostRepository.create(postId, userId);
    }
}