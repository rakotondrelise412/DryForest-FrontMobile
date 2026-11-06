export interface AnimalTracking{
    uuid_animal_tracking: string,
    date_tracking: Date,
    description: string,
    location: string,
    uuid_plantation_block: string,
    created_at?: string,
    updated_at?: string,
    is_synced?: boolean,
}

export interface CategoryAnimal{
    id_category_animal: number,
    name: string,
}

export interface Animal{
    id_animal: number,
    name: string,
    id_category_animal: number,
}

export interface AnimalTrackingDetail{
    uuid_animal_tracking_detail: string,
    have_seen: number,
    id_animal: number,
    uuid_animal_tracking: string,
    created_at?: string,
    updated_at?: string,
    is_synced?: boolean,
}