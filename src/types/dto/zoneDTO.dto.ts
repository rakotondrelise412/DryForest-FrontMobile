export interface ZoneDTO {
    name: string;
    area: number;
    geom: string;
    id_type_zone: number;
}

export interface SpeciesZoneNeedDTO{
    uuid_species_zone_need: string;
    id_species: number;
    uuid_zone_need: string;
}