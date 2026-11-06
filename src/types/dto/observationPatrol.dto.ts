
export interface ObservationPatrolDTO{
    datetime_observation: Date,
    location: string,
    description: string,
    id_observation_patrol_type: number,
    id_patrol_group: number,
    id_user: number,
    uuid_zone: string,
}