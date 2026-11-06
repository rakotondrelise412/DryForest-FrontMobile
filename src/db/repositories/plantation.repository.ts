import { Plantation } from "@/src/types/entities/plantation.entity";
import { openDB } from "..";


export const PlantationRepository = {
    async findAll(): Promise<Plantation[]>{
        try {
            const db = await openDB();
            const plantations = (await db).getAllAsync<Plantation>('SELECT * FROM plantation');
            return plantations || [];
        } catch (error) {
            console.error('PlantationRepository.findAll: ', error);
            return [];
        }
    },

    async findByUuid(uuid: string): Promise<Plantation | null>{
        try {
            const db = await openDB();
            return await db.getFirstAsync<Plantation>('SELECT * FROM plantation WHERE id_plantation = ?', [uuid]) || null;
        } catch (error) {
            console.error('PlantationRepository.findByUuid: ', error);
            return null;
        }
    },

    async insertPlantation(data: Plantation): Promise<string>{
        try {
            const uuid = String(data.uuid_plantation ?? '');
            const diameter = Number(data.diameter ?? 0);
            const height = Number(data.height ?? 0);
            const carbon_sequestered = Number(data.carbon_sequestered ?? 0);
            const image = String(data.image ?? '');
            const date_plantation = data.date_plantation.toISOString();
            const plant_number = String(data.plant_number ?? "");
            const id_species = Number(data.id_species ?? 0);
            const uuid_sub_plot = String(data.uuid_sub_plot ?? '');
            const uuid_reforestation = String(data.uuid_reforestation ?? 0);

            const sql = 'INSERT INTO plantation (uuid_plantation, diameter, height, carbon_sequestered, image, date_plantation, plant_number, created_at, updated_at, is_synced, id_species, uuid_sub_plot, uuid_reforestation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const params = [uuid, diameter, height, carbon_sequestered, image, date_plantation, plant_number, id_species, uuid_sub_plot, uuid_reforestation];

            const db = await openDB();
            await db.runAsync(sql, params);
            return uuid;
        } catch (error) {
            console.error("PlantationRepository.insertPlantation : ", error);
            throw error;
        }
    },

    async getTotalPlantationByRefAndSubPlot(uuid_reforestation: string, uuid_sub_plot: string): Promise<number> {
        try {
            const db = await openDB();
            const result = await db.getFirstAsync<{ total: number }>(
                'SELECT COUNT(*) as total FROM plantation WHERE uuid_reforestation = ? AND uuid_sub_plot = ?',
                [uuid_reforestation, uuid_sub_plot]
            );
            return result?.total ?? 0;
        } catch (error) {
            console.error("PlantationRepository.getTotalPlantaitonByReforestationAndSubPlot : ", error);
            return 0;
        }
    },

    async findAllPlantationUpdatedSince(last_sync: Date | string): Promise<Plantation[]>{
        try {
            const db = await openDB();
            const lastSyncIso = last_sync instanceof Date ? last_sync.toISOString() : String(last_sync);
            const sql = 'SELECT uuid_plantation, diameter, height, carbon_sequestered, image, date_plantation, plant_number, created_at, updated_at, is_synced, id_species, uuid_sub_plot, uuid_reforestation FROM plantation WHERE (created_at IS NOT NULL AND created_at > ?) OR (updated_at IS NOT NULL AND updated_at > ?)';
            const rows = await db.getAllAsync<Plantation>(sql, [lastSyncIso, lastSyncIso]);
            return rows || [];
        } catch (error) {
            console.error('PlantationRepository.findAllPlantationUpdatedSince: ', error);
            return [];
        }
    },

    async updatePlantationStatus(uuid_plantation: string, status: boolean): Promise<void> {
        try {
            const db = await openDB();
            await db.runAsync(`UPDATE plantation SET status = ?, updated_at = datetime('now'), is_synced = 0 WHERE uuid_plantation = ?`, [status ? 1 : 0, String(uuid_plantation)]);
        } catch (error) {
            console.error('PlantationRepository.updatePlantationStatus: ', error);
            throw error;
        }
    }
}