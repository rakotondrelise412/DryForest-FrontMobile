
export interface IncidentPatrolDTO {
    uuid_incident_patrol: string,
    datetime_incident: Date,
    location: string,
    description: string,
    image: string,
    id_patrol_group: number,
    id_user: number,
    uuid_zone: string,
    uuid_plantation_block: string,
    id_severity: number,
    id_incident_patrol_type: number,
}