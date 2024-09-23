import { UserRepository } from "../../../application/repositories/user";
import { User } from "../../../domain/entities/User";
// import { User } from ".../../core/domain/entities/User";

abstract class UseCaseBase {
    constructor(protected userRepository: UserRepository){}
}
export class CreateUser extends UseCaseBase {
    async execute(userData: {email:string, name?: string}): Promise<User> {
        return this.userRepository.create(userData);
    }
}
export class ReadById extends UseCaseBase {
    async execute(id: number): Promise<User | null> {
        return this.userRepository.readById(id);
    }
}
export class ReadByEmail extends UseCaseBase {
    async execute(email: string): Promise<User | null> {
        return this.userRepository.readByEmail(email);
    }
}
export class ReadAll extends UseCaseBase {
    async execute(): Promise<User[]> {
        return this.userRepository.readAll()
    }
}
export class UpdateUser extends UseCaseBase {
    async execute(id: number, userData: Partial<User>): Promise<User> {
        return this.userRepository.update(id, userData);
    }
}
