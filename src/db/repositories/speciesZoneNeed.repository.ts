import { SpeciesZoneNeed } from "@/src/types/entities/zone.entity";
import { openDB } from "..";

export const SpeciesZoneNeedRepository = {
    async insertSpeciesZoneNeed(data: SpeciesZoneNeed): Promise<string> {
        try {
            const uuid = String(data.uuid_species_zone_need);
            const id_species = Number(data.id_species ?? 0);
            const uuid_zone_need = String(data.uuid_zone_need);

            const db = await openDB();

            await db.runAsync(`INSERT INTO species_zone_need 
                (uuid_species_zone_need, id_species, uuid_zone_need, created_at, updated_at, is_synced) VALUES 
                (?, ?, ?, datetime('now'), NULL, 0)`, [uuid, id_species, uuid_zone_need]);

            return uuid;
        } catch (error) {
            console.error("SpeciesZoneNeedRepository.insertSpeciesZoneNeed error : ", error);
            throw error;
        }
    },

    async findAllUpdatedSince(last_sync: Date | string): Promise<SpeciesZoneNeed[]>{
        try {
            const db = await openDB();
            const lastSyncIso = last_sync instanceof Date ? last_sync.toISOString() : String(last_sync);
            const sql = `SELECT uuid_species_zone_need, id_species, uuid_zone_need, created_at, updated_at, is_synced
                FROM species_zone_need
                WHERE (created_at IS NOT NULL AND created_at > ?)
                OR (updated_at IS NOT NULL AND updated_at > ?)
            `;
            const rows = await db.getAllAsync<SpeciesZoneNeed>(sql, [lastSyncIso, lastSyncIso]);
            return rows || [];
        } catch (error) {
            console.error("SpeciesZoneNeedRepository.findAllUpdatedSince : ", error);
            return [];
        }
    }
}