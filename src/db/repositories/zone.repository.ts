import { Zone } from "@/src/types/entities/zone.entity";
import { openDB } from "..";


export const ZoneRepository = {
    async findAll(): Promise<Zone[]> {
        try {
            const db = await openDB();

            const zones = await db.getAllAsync<Zone>(`
              SELECT uuid_zone, name, area, geom, id_type_zone FROM zone
            `);
            
            return zones || [];
        } catch (error: any) {
            console.error('zoneRepository.findAll : ', error, error?.stack);
            return [];
        }
    },

    // find by uuid (zone table uses uuid_zone TEXT PRIMARY KEY)
    async findByUuid(uuid: string): Promise<Zone | null> {
        try {  
            const db = await openDB();
            const zone = await db.getFirstAsync<Zone>(
                `SELECT uuid_zone, name, area, geom, id_type_zone 
                FROM zone WHERE uuid_zone = ?`, [uuid]
            );
    
            if (!zone) return null;
    
            return zone;
        } catch (error) {
            console.error('zoneRepository.findByUuid : ', error);
            return null;
        }
    },

    async insertZone(data: Zone): Promise<string> {
        const db = await openDB();

        const uuid = String(data.uuid_zone);
        const name = data.name ?? "";
        const area = Number(data.area ?? 0);
        const geom = data.geom ?? "";
        const id_type_zone = Number(data.id_type_zone ?? 0);

        try {
        // use parameterized runAsync to avoid SQL injection and transaction nesting
            console.log('zoneRepository.insertZone - params:', { uuid, name, area, geom, id_type_zone });
            await db.runAsync(
                `INSERT INTO zone (uuid_zone, name, area, geom, created_at, updated_at, is_synced, id_type_zone)
                VALUES (?, ?, ?, ?, datetime('now'), NULL, 0, ?)`,
                [uuid, name, area, geom, id_type_zone]
        );
        return uuid;
        } catch (err) {
        console.error("zoneRepository.insertZone error:", err);
        throw err;
        }
    },

    async findAllZoneUpdatedSince(last_sync: Date | string): Promise<Zone[]>{
        try {
            const db = await openDB();
            const lastSyncIso = last_sync instanceof Date ? last_sync.toISOString() : String(last_sync);
            const sql = `SELECT uuid_zone, name, area, geom, created_at, updated_at, is_synced, id_type_zone
                FROM zone
                WHERE (created_at IS NOT NULL AND created_at > ?)
                OR (updated_at IS NOT NULL AND updated_at > ?)
                `; 
            const rows = await db.getAllAsync<Zone>(sql, [lastSyncIso, lastSyncIso]);
            return rows || [];
        } catch (error) {
            console.error("ZoneRepository.findAllZoneUpdatedSince : ", error);
            return [];
        }
    }
}