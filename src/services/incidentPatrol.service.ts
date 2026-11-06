
import { IncidentPatrolRepository } from "../db/repositories/incidentPatrol.repository";
import { IncidentPatrol } from "../types/entities/incidentPatrol.entity";
import { v4 as uuidv4 } from "uuid";
import { UserService } from "./user.service";

export const IncidentPatrolService = {
    async insertIncidentPatrol(data: IncidentPatrol): Promise<string>{
        const uuid = uuidv4();
        const user = await UserService.findById(1);
        const id_user = user?.id_user;
        
        const incidentPatrol: IncidentPatrol = {
            uuid_incident_patrol: uuid,
            datetime_incident: data.datetime_incident,
            location: String(data.location),
            description: String(data.description),
            image: String(data.image),
            id_patrol_group: Number((data as any).id_patrol_group),
            id_user: Number(id_user),
            // id_user: Number((data as any).id_user),
            uuid_zone: (data as any).uuid_zone,
            uuid_plantation_block: (data as any).uuid_plantation_block,
            id_severity: Number((data as any).id_severity),
            id_incident_patrol_type: Number((data as any).id_incident_patrol_type)
        }

        await IncidentPatrolRepository.insertIncidentPatrol(incidentPatrol);

        return uuid;
    }
}