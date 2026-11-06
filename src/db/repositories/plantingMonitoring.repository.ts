import { PlantingMonitoring } from "@/src/types/entities/plantation.entity";
import { openDB } from "..";


export const PlantingMonitoringRepository = {

    async insertPlantingMonitoring(data: PlantingMonitoring): Promise<string>{
        try {
            const db = await openDB();
            const uuid = String(data.uuid_planting_monitoring);
            const diameter = Number(data.diameter ?? 0);
            const height = Number(data.height ?? 0);
            const carbon_sequestered = Number(data.carbon_sequestered);
            const image = String(data.image ?? "");
            const date_planting_monitoring = data.date_planting_monitoring.toISOString();
            const auto_generation = Number(data.auto_generation ?? 0);
            const uuid_plantation = String(data.uuid_plantation);

            await db.runAsync(`INSERT INTO planting_monitoring (uuid_planting_monitoring, diameter, height, carbon_sequestered, image, date_planting_monitoring, auto_generation, created_at, updated_at, is_synced, uuid_plantation) VALUES (?,?,?,?,?,?,?, date('now'), NULL, 0, ?)`, [uuid, diameter, height, carbon_sequestered, image, date_planting_monitoring, auto_generation, uuid_plantation]);

            return uuid;

        } catch (error) {
            console.error("PlantingMonitoringRepository.insertPlantingMonitoring : ", error);
            throw error;
        }
    },

    async findAllPlantingMonitoringUpdatedSince(last_sync: Date | string): Promise<PlantingMonitoring[]>{
        try {
            const db = await openDB();
            const lastSyncIso = last_sync instanceof Date ? last_sync.toISOString() : String(last_sync);
            const sql = `SELECT uuid_planting_monitoring, diameter, height, carbon_sequestered, image, date_planting_monitoring, auto_generation, created_at, updated_at, is_synced, uuid_plantation
                FROM planting_monitoring
                WHERE (created_at IS NOT NULL AND created_at > ?)
                OR (updated_at IS NOT NULL AND updated_at > ?)
            `;
            const rows = db.getAllAsync<PlantingMonitoring>(sql, [lastSyncIso, lastSyncIso]);
            return rows || [];
        } catch (error) {
            console.error("PlantingMonitoringRepository.findAllPlantingMonitoringUpdatedSince : ", error);
            return [];
        }
    }
}