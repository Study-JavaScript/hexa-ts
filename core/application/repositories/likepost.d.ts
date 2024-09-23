export type LikePostRepository = {
    create: (postId: number, userId: number) => Promise<Object>
}