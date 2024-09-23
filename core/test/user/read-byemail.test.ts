import { UserRepository } from "application/repositories/user";
import { ReadByEmail } from "application/usecases/atomic/user";
import { User } from "../../../domain/entities/User";

// Mock del repositorio
const mockUserRepository = (): jest.Mocked<UserRepository> => ({
  create: jest.fn(),
  readById: jest.fn(),
  readByEmail: jest.fn(),
  readAll: jest.fn(),
  update: jest.fn(),
});

describe('ReadByEmail UseCase', () => {
  it('should return a user by email', async () => {
    const userRepository = mockUserRepository();

    const mockUser = new User(1, 'test@example.com', 'password123', 'Test User');
    userRepository.readByEmail.mockResolvedValue(mockUser);

    const readByEmail = new ReadByEmail(userRepository);
    const result = await readByEmail.execute('test@example.com');

    expect(userRepository.readByEmail).toHaveBeenCalledWith('test@example.com');
    expect(result).toEqual(mockUser);
  });

  it('should return null if no user is found', async () => {
    const userRepository = mockUserRepository();
    userRepository.readByEmail.mockResolvedValue(null);

    const readByEmail = new ReadByEmail(userRepository);
    const result = await readByEmail.execute('notfound@example.com');

    expect(userRepository.readByEmail).toHaveBeenCalledWith('notfound@example.com');
    expect(result).toBeNull();
  });
});