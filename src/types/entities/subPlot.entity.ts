export interface SubPlot{
    uuid_sub_plot: string;
    name: string;
    width: number;
    height: number;
    location: string;
    created_at?: string;
    updated_at?: string;
    is_synced?: boolean;
    uuid_plantation_block: string;
}