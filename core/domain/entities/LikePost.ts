// core/src/domain/entities/LikePost.ts

export class LikePost {
    constructor(
        public id: number,
        public userId: number,
        public postId: number,
        public createdAt: Date
    ) {}
}
