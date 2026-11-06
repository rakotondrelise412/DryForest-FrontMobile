import { UserRepository } from "../db/repositories/user.repository";
import { Users } from "../types/entities/user.entity";

export const UserService = {
    async findById(id: number): Promise<Users | null> {
        return await UserRepository.getById(id);
    },

    async findByUsername(username: string): Promise<Users | null> {
        return await UserRepository.getByUsername(username);
    },

    async findAny(): Promise<Users | null> {
        return await UserRepository.getAny();
    },

    async findIdSite(): Promise<number | null> {
        return await UserRepository.getIdSite();
    }
}