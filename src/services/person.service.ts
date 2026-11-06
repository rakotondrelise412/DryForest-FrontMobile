import { PersonRepository } from "../db/repositories/person.repository";
import { Person } from "../types/entities/user.entity";

export const PersonService = {
    async findAll(): Promise<Person[]> {
        return await PersonRepository.getAll();
    },

    async findById(id: number): Promise<Person | null> {
        return await PersonRepository.getById(id);
    }
}