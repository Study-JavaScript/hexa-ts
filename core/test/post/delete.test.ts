// test/post/DeletePost.test.ts

import { PostRepository } from "application/repositories/post";
import { DeletePost } from "application/usecases/atomic/post";



// Mock del repositorio
const mockPostRepository = (): jest.Mocked<PostRepository> => ({
  create: jest.fn(),
  readAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('DeletePost UseCase', () => {
  it('should delete a post by id', async () => {
    const postRepository = mockPostRepository();

    const deletePost = new DeletePost(postRepository);
    await deletePost.execute(1);

    expect(postRepository.delete).toHaveBeenCalledWith(1);
  });
});