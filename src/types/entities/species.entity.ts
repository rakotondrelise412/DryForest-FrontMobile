export interface SpeciesType {
    id_species_type: number;
    name: string;
}

export interface Species {
    id_species: number;
    mg_name: string | null;
    fr_name: string | null;
    en_name: string | null;
    scientific_name: string;
    density: number;
    id_type: number;
    stock_quantity?: number;
}
