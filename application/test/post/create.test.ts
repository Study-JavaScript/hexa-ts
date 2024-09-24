// test/post/CreatePost.test.ts

import { PostRepository } from "repositories/post";
import { CreatePost } from "usecases/atomic/post";
import { Post } from "../../../domain/entities/Post";



// Mock del repositorio
const mockPostRepository = (): jest.Mocked<PostRepository> => ({
  create: jest.fn(),
  readAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('CreatePost UseCase', () => {
  it('should create a new post and return it', async () => {
    const postRepository = mockPostRepository();

    const postData = { title: 'New Post', content: 'Content of the post' };
    const newPost = new Post(1, 'New Post', 'Content of the post',false, 1);

    postRepository.create.mockResolvedValue(newPost);

    const createPost = new CreatePost(postRepository);
    const result = await createPost.execute(postData, 1);

    expect(postRepository.create).toHaveBeenCalledWith(postData, 1);
    expect(result).toEqual(newPost);
  });
});
