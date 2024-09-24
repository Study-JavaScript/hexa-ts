
import { UserRepository } from "repositories/user";
import { User } from "../../../domain/entities/User";
import { ReadAll } from "usecases/atomic/user";

// Mock del repositorio
const mockUserRepository = (): jest.Mocked<UserRepository> => ({
  create: jest.fn(),
  readById: jest.fn(),
  readByEmail: jest.fn(),
  readAll: jest.fn(),
  update: jest.fn(),
});

describe('ReadAll UseCase', () => {
  it('should return all users', async () => {
    const userRepository = mockUserRepository();

    const mockUsers = [
      new User(1, 'user1@example.com', 'password1', 'User One'),
      new User(2, 'user2@example.com', 'password2', 'User Two'),
    ];
    userRepository.readAll.mockResolvedValue(mockUsers);

    const readAll = new ReadAll(userRepository);
    const result = await readAll.execute();

    expect(userRepository.readAll).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });
});
