import { Router } from "express";
import { PostController } from "../controllers/post";


const controller = new PostController()
const PostRouter = Router()

PostRouter.post('/posts', controller.create);
PostRouter.get('/posts', controller.readAll);
PostRouter.delete('/posts/:id', controller.delete);
PostRouter.put('/posts/:id', controller.update);



export {PostRouter}