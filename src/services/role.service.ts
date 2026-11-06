import { RoleRepository } from "../db/repositories/role.repository";
import { Role } from "../types/entities/user.entity";

export const RoleService = {
    async findAll(): Promise<Role[]> {
        return await RoleRepository.getAll();
    },

    async findById(id: number): Promise<Role | null> {
        return await RoleRepository.getById(id);
    }
}