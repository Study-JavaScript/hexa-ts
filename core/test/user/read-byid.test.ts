import { UserRepository } from "application/repositories/user";
import { ReadById } from "application/usecases/atomic/user";
import { User } from "../../../domain/entities/User";

// Mock del repositorio
const mockUserRepository = (): jest.Mocked<UserRepository> => ({
  create: jest.fn(),
  readById: jest.fn(),
  readByEmail: jest.fn(),
  readAll: jest.fn(),
  update: jest.fn(),
});

describe('ReadById UseCase', () => {
  it('should return a user by id', async () => {
    const userRepository = mockUserRepository();

    const mockUser = new User(1, 'test@example.com', 'password123', 'Test User');
    userRepository.readById.mockResolvedValue(mockUser);

    const readById = new ReadById(userRepository);
    const result = await readById.execute(1);

    expect(userRepository.readById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });

  it('should return null if no user is found', async () => {
    const userRepository = mockUserRepository();
    userRepository.readById.mockResolvedValue(null);

    const readById = new ReadById(userRepository);
    const result = await readById.execute(999);

    expect(userRepository.readById).toHaveBeenCalledWith(999);
    expect(result).toBeNull();
  });
});
