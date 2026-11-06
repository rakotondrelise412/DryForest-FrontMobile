import { Reforestation } from "@/src/types/entities/reforestation.entity";
import { openDB } from "..";

export const ReforestationRepository = {
    async createReforestation(data: Reforestation): Promise<string> {
        try {
            const uuid = String(data.uuid_reforestation);
            const date = data.date_reforestation.toISOString();
            const quantity = Number(data.quantity ?? 0);
            const uuid_zone = String(data.uuid_zone);

            const db = await openDB();
            await db.runAsync(`INSERT INTO reforestation (uuid_reforestation, date_reforestation, quantity, created_at, updated_at, is_synced, uuid_zone) VALUES (?, ?, ?, datetime('now'), NULL, 0, ?)`, [uuid, date, quantity, uuid_zone]);

            return uuid;
        } catch (error) {
            console.error("ReforestationRepository.createReforestation error : ", error);
            throw error;
        }
    },

    async getLastReforestationByZone(uuid_zone: string): Promise<Reforestation | null> {
        try {
            const db = await openDB();
            const result = await db.getAllSync(
                `SELECT uuid_reforestation, date_reforestation, quantity, uuid_zone FROM reforestation 
                 WHERE uuid_zone = ?
                 ORDER BY date_reforestation DESC, created_at DESC 
                 LIMIT 1`,
                [uuid_zone]
            );

            const rst = Array.isArray(result) && result.length > 0 ? result[0] : null;

            return rst ? this.mapToReforestation(rst) : null;
        } catch (error) {
            console.error("ReforestationRepository.getLastReforestationByZone error : ", error);
            throw error;
        }
    },

    async mapToReforestation(result: any): Promise<Reforestation> {
        return {
            uuid_reforestation: String(result.uuid_reforestation ?? ""),
            date_reforestation: result.date_reforestation ? new Date(result.date_reforestation) : new Date(NaN),
            quantity: typeof result.quantity === "number" ? result.quantity : Number(result.quantity ?? 0),
            uuid_zone: String(result.uuid_zone ?? ""),
            created_at: result.created_at ?? undefined,
            updated_at: result.updated_at ?? undefined,
            is_synced: result.is_synced === 1 ? true : !!result.is_synced
          };
    },

    async findAllReforestationUpdatedSince(last_sync: Date | string): Promise<Reforestation[]>{
        try {
            const db = await openDB();
            const lastSyncIso = last_sync instanceof Date ? last_sync.toISOString() : String(last_sync);
            const sql = `SELECT uuid_reforestation, date_reforestation, quantity, created_at, updated_at, is_synced, uuid_zone
                FROM reforestation
                WHERE (created_at IS NOT NULL AND created_at > ?)
                OR (updated_at IS NOT NULL AND updated_at > ?)
            `;
            const rows = db.getAllAsync<Reforestation>(sql, [lastSyncIso, lastSyncIso]);
            return rows || [];
        } catch (error) {
            console.error("ReforestationRepository.findAllReforestationUpdatedSince : ", error);
            return [];
        }
    }
}