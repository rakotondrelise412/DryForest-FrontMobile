import { AnimalRepository } from "../db/repositories/animal.repository";
import { Animal } from "../types/entities/animalTracking.entity";


export const AnimalService = {
    async findAll(): Promise<Animal[]>{
        return await AnimalRepository.findAll();
    },

    async findById(id: number): Promise<Animal | null>{
        return await AnimalRepository.findById(id);
    }
}