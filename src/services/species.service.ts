import { SpeciesRepository } from "../db/repositories/species.repository";
import { Species } from "../types/entities/species.entity";

export const SpeciesService = {
    async findAll(): Promise<Species[]> {
        return await SpeciesRepository.getAll();
    },

    async findById(id: number): Promise<Species | null> {
        return await SpeciesRepository.getById(id);
    },

    async findAllWithStock(): Promise<Species[]> {
        return await SpeciesRepository.getAllWithStock();
    },

    async findWithStockById(id: number): Promise<Species | null> {
        return await SpeciesRepository.getWithStockById(id);
    }
}