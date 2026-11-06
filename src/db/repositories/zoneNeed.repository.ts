import { ZoneNeed } from "@/src/types/entities/zone.entity";
import { openDB } from "..";


export const ZoneNeedRepository = {

    async create(data: ZoneNeed): Promise<string>{
        try {
            const db = await openDB();
            const uuid = String(data.uuid_zone_need);
            const uuid_zone = String(data.uuid_zone ?? 0);

            await db.runAsync(`INSERT INTO zone_need 
                (uuid_zone_need, uuid_zone, created_at, updated_at, is_synced) VALUES 
                (?,?, datetime('now'), NULL, 0)`, [uuid, uuid_zone]);
            
            return uuid;
        } catch (error) {
            console.error("zoneNeedRepository.insert error: ", error);
            throw error;
        }
    },

    async findAllZoneNeedUpdatedSince(last_sync: Date | string): Promise<ZoneNeed[]> {
        try {
          const db = await openDB();
          const lastSyncIso = last_sync instanceof Date ? last_sync.toISOString() : String(last_sync);

          const sql = `
            SELECT uuid_zone_need, uuid_zone, created_at, updated_at, is_synced
            FROM zone_need
            WHERE (created_at IS NOT NULL AND created_at > ?)
               OR (updated_at IS NOT NULL AND updated_at > ?)
          `;
    
          const rows = await db.getAllAsync<ZoneNeed>(sql, [lastSyncIso, lastSyncIso]);
          return rows || [];
        } catch (error) {
          console.error("ZoneNeedRepository.findAllUpdatedSince : ", error);
          return [];
        }
    },
}