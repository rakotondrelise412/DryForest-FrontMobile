import { ObservationPatrolTypeRepository } from "../db/repositories/observationPatrolType.repository";
import { ObservationPatrolType } from "../types/entities/ObservationPatrol.entity";

export const ObservationPatrolTypeService = {
  async findAll(): Promise<ObservationPatrolType[]> {
    return await ObservationPatrolTypeRepository.findAll();
  },

  async findById(id: number): Promise<ObservationPatrolType | null> {
    return await ObservationPatrolTypeRepository.getById(id);
  },
};
