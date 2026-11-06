export interface PlantationBlock{
    uuid_plantation_block: string;
    name: string;
    width: number;
    height: number;
    nb_sub_plot: number;
    geom: string;
    created_at?: string;
    updated_at?: string;
    is_synced?: boolean;
    uuid_zone: string;
}