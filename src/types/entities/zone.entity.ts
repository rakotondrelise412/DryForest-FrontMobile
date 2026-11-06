export interface Zone{
    uuid_zone: string;
    name: string;
    area: number;
    geom: string;
    created_at?: string;
    updated_at?: string;
    is_synced?: boolean;
    id_type_zone: number;
}

export interface ZoneNeed{
    uuid_zone_need: string;
    uuid_zone: string;
    created_at?: string;
    updated_at?: string;
    is_synced?: boolean;
}

export interface SpeciesZoneNeed{
    uuid_species_zone_need: string;
    id_species: number;
    uuid_zone_need: string;
    created_at?: string;
    updated_at?: string;
    is_synced?: boolean;
}

