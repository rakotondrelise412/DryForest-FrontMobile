export interface Reforestation {
    uuid_reforestation: string;
    date_reforestation: Date;
    quantity: number;
    created_at?: string;
    updated_at?: string;
    is_synced?: boolean;
    uuid_zone: string;
}

export interface ReforestationDetail {
    uuid_reforestation_detail: string;
    quantity: number;
    created_at?: string;
    updated_at?: string;
    is_synced?: boolean;
    id_species: number;
    uuid_reforestation: string;
}