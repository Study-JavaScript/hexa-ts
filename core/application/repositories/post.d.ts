export type PostRepository = {
    create(postData: {title:string, content:string}, userId: number): Promise<Post>;
    readAll(): Promise<Post[]>;
    delete(id: number): Promise<Post>;
    update(id: number, postData: Partial<Post>): Promise<Post>;

}