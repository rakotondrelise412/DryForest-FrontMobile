import { IncidentPatrolTypeRepository } from "../db/repositories/incidentPatrolType.repository";
import { IncidentPatrolType } from "../types/entities/patrolGroup.entity";

export const IncidentPatrolTypeService = {
    async findAll(): Promise<IncidentPatrolType[]>{
        return await IncidentPatrolTypeRepository.findAll();
    },

    async findById(id: number): Promise<IncidentPatrolType | null>{
        return await IncidentPatrolTypeRepository.getById(id);
    }
}