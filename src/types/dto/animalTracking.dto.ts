export interface AnimalTrackingDetailDTO {
    uuid_animal_tracking_detail: string,
    have_seen: number,
    id_animal: number,
    uuid_animal_tracking: string,
}

export interface AnimalTrackingDTO{
    date_tracking: Date,
    description: string,
    location: string,
    uuid_plantation_block: string,
}