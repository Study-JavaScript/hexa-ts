// test/post/ReadAllPosts.test.ts

import { PostRepository } from "application/repositories/post";
import { ReadAllPosts } from "application/usecases/atomic/post";
import { Post } from "domain/entities/Post";

// Mock del repositorio
const mockPostRepository = (): jest.Mocked<PostRepository> => ({
  create: jest.fn(),
  readAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('ReadAllPosts UseCase', () => {
  it('should return all posts', async () => {
    const postRepository = mockPostRepository();

    const mockPosts = [
      new Post(1, 'Post 1', 'Content 1',false, 1),
      new Post(2, 'Post 2', 'Content 2',false, 1),
    ];
    postRepository.readAll.mockResolvedValue(mockPosts);

    const readAllPosts = new ReadAllPosts(postRepository);
    const result = await readAllPosts.execute();

    expect(postRepository.readAll).toHaveBeenCalled();
    expect(result).toEqual(mockPosts);
  });
});
