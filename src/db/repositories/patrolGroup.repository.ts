import { PatrolGroup } from "@/src/types/entities/patrolGroup.entity";
import { openDB } from "..";

export const PatrolGroupRepository = {
    async findAll(): Promise<PatrolGroup[]>{
        try {
            const db = await openDB();
            const patrol_groups = db.getAllAsync<PatrolGroup>('SELECT * FROM patrol_group');
            return patrol_groups || [];
        } catch (error) {
            console.error('PatrolGroupRepository.findAll: ', error);
            return [];
        }
    },

    async getById(id: number): Promise<PatrolGroup | null>{
        const db = await openDB();

        return await db.getFirstAsync<PatrolGroup>('SELECT * FROM patrol_group WHERE id_patrol_group = ?', [id]);
    }
}