export interface ObservationPat{
    uuid_observation_pat: string,
    datetime_observation: Date,
    location: string,
    description: string,
    created_at?: string,
    updated_at?: string,
    is_synced?: boolean,
    id_observation_patrol_type: number,
    id_patrol_group: number,
    id_user: number,
    uuid_zone: string,
}

export interface ObservationPatrolType{
    id_observation_patrol_type: number,
    name: string
}