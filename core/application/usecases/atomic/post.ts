import { PostRepository } from "../../../application/repositories/post";
import { Post } from "../../../domain/entities/Post";

abstract class UseCaseBase {
    constructor(protected postRepository: PostRepository) {}
}

export class CreatePost extends UseCaseBase {
    async execute(postData: Omit<Post, "id"|"deleted">, userId: number): Promise<Post> {
        return this.postRepository.create(postData, userId);
    }
}

export class ReadAllPosts extends UseCaseBase {
    async execute(): Promise<Post[]> {
        return this.postRepository.readAll();
    }
}

export class UpdatePost extends UseCaseBase {
    async execute(id: number, postData: Partial<Post>): Promise<Post> {
        return this.postRepository.update(id, postData);
    }
}

export class DeletePost extends UseCaseBase {
    async execute(id: number): Promise<void> {
        await this.postRepository.delete(id);
    }
}
