export class Post{
    constructor(
        public id: number,
        public title: string,
        public content: string | null,
        public deleted: boolean = false,
        public authorId: number
    ){}
}