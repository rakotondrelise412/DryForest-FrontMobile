import { SeverityRepository } from "../db/repositories/severity.repository";
import { Severity } from "../types/entities/severity.entity";

export const SeverityService = {
    async findAll(): Promise<Severity[]> {
        return await SeverityRepository.getAll();
    },

    async findById(id: number): Promise<Severity | null> {
        return await SeverityRepository.getById(id);
    }
}