import { IncidentPatrol } from "@/src/types/entities/incidentPatrol.entity";
import { openDB } from "..";

export const IncidentPatrolRepository = {

    async findAll(): Promise<IncidentPatrol[]>{
        try {
            const db = await openDB();
            const incident_patrols = db.getAllAsync<IncidentPatrol>('SELECT * FROM incident_patrol');
            return incident_patrols;
        } catch (error) {
            console.error('IncidentPatrolRepository.findAll: ', error);
            return [];
        }
    },

    async insertIncidentPatrol(data: IncidentPatrol): Promise<String>{
        try {
            const uuid = String(data.uuid_incident_patrol);
            const datetime_incident = data.datetime_incident.toISOString();
            const location = data.location ?? "";
            const desription = data.description ?? "";
            const image = String(data.image ?? "");
            const id_patrol_group = Number(data.id_patrol_group ?? 0);
            const id_user = Number(data.id_user ?? 0);
            const uuid_zone = String(data.uuid_zone ?? "");
            const uuid_plantation_block = String(data.uuid_plantation_block ?? "");
            const id_severity = Number(data.id_severity ?? 0);
            const id_incident_patrol_type = Number(data.id_incident_patrol_type ?? 0);

            const db = await openDB();

            db.runAsync('INSERT INTO incident_patrol (uuid_incident_patrol, datetime_incident, location, description, image, created_at, updated_at, is_synced, id_patrol_group, id_user, uuid_zone, uuid_plantation_block, id_severity, id_incident_patrol_type) VALUES (?, ?, ?, ?, ?, datetime(now), NULL, 0, ?, ?, ?, ?, ?, ?)', [uuid, datetime_incident, location, desription, image, id_patrol_group, id_user, uuid_zone, uuid_plantation_block, id_severity, id_incident_patrol_type ]);

            return "";
        } catch (error) {
            console.error('IncidentPatrolRepository.insertIncidentPatrol: ', error);
            throw error;
        }
    }
}