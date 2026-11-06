import { PatrolGroupRepository } from "../db/repositories/patrolGroup.repository";
import { PatrolGroup } from "../types/entities/patrolGroup.entity";

export const PatrolGroupService = {

    async findAll(): Promise<PatrolGroup[]>{
        return await PatrolGroupRepository.findAll();
    },

    async findById(id: number): Promise<PatrolGroup | null>{
        return await PatrolGroupRepository.getById(id);
    }
}