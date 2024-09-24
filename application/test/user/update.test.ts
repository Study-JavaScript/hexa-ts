
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../repositories/user";
import { UpdateUser } from "../../usecases/atomic/user";

// Mock del repositorio
const mockUserRepository = (): jest.Mocked<UserRepository> => ({
  create: jest.fn(),
  readById: jest.fn(),
  readByEmail: jest.fn(),
  readAll: jest.fn(),
  update: jest.fn(),
});

describe('UpdateUser UseCase', () => {
  it('should update an existing user and return the updated user', async () => {
    const userRepository = mockUserRepository();

    const existingUser = new User(1, 'user@example.com', 'oldPassword', 'Old Name');
    const updatedUser = new User(1, 'user@example.com', 'newPassword', 'New Name');
    userRepository.readById.mockResolvedValue(existingUser);
    userRepository.update.mockResolvedValue(updatedUser);

    const updateUser = new UpdateUser(userRepository);
    const userData = { password: 'newPassword', name: 'New Name' };
    const result = await updateUser.execute(1, userData);

    expect(userRepository.readById).toHaveBeenCalledWith(1);
    expect(userRepository.update).toHaveBeenCalledWith(1, userData);
    expect(result).toEqual(updatedUser);
  });

  it('should throw an error if the user does not exist', async () => {
    const userRepository = mockUserRepository();
    userRepository.readById.mockResolvedValue(null);

    const updateUser = new UpdateUser(userRepository);
    const userData = { name: 'Nonexistent' };

    await expect(updateUser.execute(999, userData)).rejects.toThrow('User not found');
  });
});
