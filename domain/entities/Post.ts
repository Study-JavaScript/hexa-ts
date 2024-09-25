// export class Post{
//     constructor(
//         public id: number,
//         public title: string,
//         public content: string | null,
//         public deleted: boolean = false,
//         public authorId: number
//     ){}
// }

export type Post = {
    id: number,
    title: string,
    content: string | null,
    deleted: boolean,
    authorId: number
}