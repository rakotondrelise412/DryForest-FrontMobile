import { ObservationPatrolType } from "@/src/types/entities/ObservationPatrol.entity";
import { openDB } from "..";

export const ObservationPatrolTypeRepository = {
  async findAll(): Promise<ObservationPatrolType[]> {
    try {
      const db = openDB();
      const observation_patrol_type = (
        await db
      ).getAllAsync<ObservationPatrolType>(
        `SELECT * FROM observation_patrol_type`,
      );
      return observation_patrol_type || [];
    } catch (error) {
      console.error("ObservationPatrolTypeRepository.findAll : ", error);
      return [];
    }
  },

  async getById(id: number): Promise<ObservationPatrolType | null> {
    const db = await openDB();

    return await db.getFirstAsync<ObservationPatrolType>(
      `SELECT * FROM observation_patrol_type WHERE id_observation_patrol_type = ?`,
      [id],
    );
  },
};
