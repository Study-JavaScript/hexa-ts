import { UserRepository } from "application/repositories/user";
import { CreateUser } from "application/usecases/atomic/user";
import { User } from "domain/entities/User";


// Mock del repositorio
const mockUserRepository = (): jest.Mocked<UserRepository> => ({
  create: jest.fn(),
  readById: jest.fn(),
  readByEmail: jest.fn(),
  readAll: jest.fn(),
  update: jest.fn(),
});

describe('CreateUser UseCase', () => {
  it('should create a new user and return it', async () => {
    // Crear el mock del repositorio
    const userRepository = mockUserRepository();

    // Crear un mock del usuario que el repositorio devolvería
    const mockUser = new User(1, 'test@example.com', 'password123', 'Test User');
    userRepository.create.mockResolvedValue(mockUser);

    // Instanciar el use case con el repositorio mockeado
    const createUser = new CreateUser(userRepository);

    // Ejecutar el use case
    const userData = { email: 'test@example.com', name: 'Test User' };
    const result = await createUser.execute(userData);

    // Verificar que el repositorio fue llamado correctamente
    expect(userRepository.create).toHaveBeenCalledWith(userData);

    // Verificar que el resultado sea el esperado
    expect(result).toEqual(mockUser);
  });
});
