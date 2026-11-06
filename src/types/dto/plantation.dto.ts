
export interface PlantationDTO {
    diameter: number,
    height: number,
    carbon_sequestered: number,
    image: string,
    date_plantation: Date,
    plant_number: string,
    id_species: number,
    uuid_sub_plot: string,
}

export interface PlantingMonitoringDTO{
    diameter: number,
    height: number,
    carbon_sequestered: number,
    image: string,
    date_planting_monitoring: Date,
    auto_generation: number | null,
    plant_number: number,
    uuid_plantation: string,
}