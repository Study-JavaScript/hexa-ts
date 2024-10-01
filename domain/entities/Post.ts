export type Post = {
    id: number,
    title: string,
    content: string | null,
    deleted: boolean,
    authorId: number
}