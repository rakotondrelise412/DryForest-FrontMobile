import { SpeciesTypeRepository } from "../db/repositories/speciesType.repository";
import { SpeciesType } from "../types/entities/species.entity";

export const SpeciesTypeService = {
    async findAll(): Promise<SpeciesType[]> {
        return await SpeciesTypeRepository.getAll();
    },

    async findById(id: number): Promise<SpeciesType | null> {
        return await SpeciesTypeRepository.getById(id);
    }
}