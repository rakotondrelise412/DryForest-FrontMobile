import { ReforestationDetail } from "@/src/types/entities/reforestation.entity";
import { openDB } from "..";


export const ReforestationDetailRepository = {
    async insertRefDetail(data: ReforestationDetail): Promise<string> {
        try {
            const uuid = String(data.uuid_reforestation_detail);
            const quantity = Number(data.quantity ?? 0);
            const id_species = Number(data.id_species ?? 0);
            const uuid_reforestation = String(data.uuid_reforestation);

            const db = await openDB();

            await db.runAsync(`INSERT INTO reforestation_detail (uuid_reforestation_detail, quantity, created_at, updated_at, is_synced, id_species, uuid_reforestation) VALUES (?, ?, datetime('now'), NULL, 0, ?, ?)`, [uuid, quantity, id_species, uuid_reforestation]);

            return uuid;
        } catch (error) {
            console.error("ReforestationDetailRepository.insertRefDetail error : ", error);
            throw error;
        }
    },

    async findAllReforestationDetailUpdatedSince(last_sync: Date | string): Promise<ReforestationDetail[]>{
        try {
            const db = await openDB();
            const lastSyncIso = last_sync instanceof Date ? last_sync.toISOString() : String(last_sync);
            const sql = `SELECT uuid_reforestation_detail, quantity, created_at, updated_at, is_synced, id_species, uuid_reforestation
                FROM reforestation_detail
                WHERE (created_at IS NOT NULL AND created_at > ?)
                OR (updated_at IS NOT NULL AND updated_at > ?)
            `;
            const rows = db.getAllAsync<ReforestationDetail>(sql, [lastSyncIso, lastSyncIso]);
            return rows || [];
        } catch (error) {
            console.error("ReforestationDetailRepository.findAllReforestationDetailUpdatedSince : ", error);
            return [];
        }
    }
}