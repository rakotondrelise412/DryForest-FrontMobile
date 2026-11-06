
export interface Plantation{
    uuid_plantation: string,
    diameter: number,
    height: number,
    carbon_sequestered: number,
    image: string,
    date_plantation: Date,
    plant_number: string,
    status: boolean,
    created_at?: string,
    updated_at?: string,
    is_synced?: boolean,
    id_species: number,
    uuid_sub_plot: string,
    uuid_reforestation: string,
}

export interface PlantingMonitoring {
    uuid_planting_monitoring: string,
    diameter: number,
    height: number,
    carbon_sequestered: number,
    image: string,
    date_planting_monitoring: Date,
    auto_generation: number | null,
    created_at?: string,
    updated_at?: string,
    is_synced?: boolean,
    uuid_plantation: string,
}