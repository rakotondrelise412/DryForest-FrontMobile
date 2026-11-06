import { IncidentPatrolType } from "@/src/types/entities/patrolGroup.entity";
import { openDB } from "..";


export const IncidentPatrolTypeRepository = {
    async findAll(): Promise<IncidentPatrolType[]>{
        try {
            const db = await openDB();
            const incident_patrol_type = (await db).getAllAsync<IncidentPatrolType>('SELECT * FROM incident_patrol_type');
            return incident_patrol_type;
        } catch (error) {
            console.error('IncidentPatrolTypeRepository.findAll:', error);
            return [];
        }
    },

    async getById(id: number): Promise<IncidentPatrolType | null>{
        const db = await openDB();

        return await db.getFirstAsync<IncidentPatrolType>('SELECT * FROM incident_patrol_type WHERE id_incident_patrol_type = ?', [id]);
    }
}