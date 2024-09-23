// test/post/UpdatePost.test.ts

import { PostRepository } from "application/repositories/post";
import { UpdatePost } from "application/usecases/atomic/post";
import { Post } from "../../../domain/entities/Post";




// Mock del repositorio
const mockPostRepository = (): jest.Mocked<PostRepository> => ({
    create: jest.fn(),
    readAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
});

describe('UpdatePost UseCase', () => {
    it('should update an existing post and return it', async () => {
        const postRepository = mockPostRepository();

        const existingPost = new Post(1, 'Old Post', 'Old Content',false, 1);
        const updatedPost = new Post(1, 'Updated Post', 'Updated Content',false, 1);

        postRepository.update.mockResolvedValue(updatedPost); // Simulamos una actualización exitosa

        const updatePost = new UpdatePost(postRepository);
        const postData = { title: 'Updated Post', content: 'Updated Content' };
        const result = await updatePost.execute(1, postData);

        expect(postRepository.update).toHaveBeenCalledWith(1, postData);
        expect(result).toEqual(updatedPost);
    });

    it('should throw an error if the post does not exist', async () => {
        const postRepository = mockPostRepository();
        postRepository.update.mockResolvedValue(null); // Simula que no se encontró el post

        const updatePost = new UpdatePost(postRepository);
        const postData = { title: 'Nonexistent Post', content: 'Content' };

        await expect(updatePost.execute(999, postData)).rejects.toThrow('Post not found'); // Ahora debe pasar
    });
});
