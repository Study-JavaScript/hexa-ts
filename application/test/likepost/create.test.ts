import { LikePost } from "../../../domain/entities/LikePost";
import { LikePostRepository } from "../../repositories/likepost";
import { CreateLikePost } from "../../usecases/atomic/likepost";




// Mock del repositorio
const mockLikePostRepository = (): jest.Mocked<LikePostRepository> => ({
    create: jest.fn(),
});

describe('CreateLikePost UseCase', () => {
    it('should create a like for a post and return it', async () => {
        const likePostRepository = mockLikePostRepository();

        const newLikePost = new LikePost(1, 1, 1, new Date());
        likePostRepository.create.mockResolvedValue(newLikePost);

        const createLikePost = new CreateLikePost(likePostRepository);
        const userId = 1;
        const postId = 1;
        const result = await createLikePost.execute(userId, postId);

        expect(likePostRepository.create).toHaveBeenCalledWith(userId, postId);
        expect(result).toEqual(newLikePost);
    });
});
