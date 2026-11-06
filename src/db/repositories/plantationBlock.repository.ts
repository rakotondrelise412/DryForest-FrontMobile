import { PlantationBlock } from "@/src/types/entities/plantationBlock.entity";
import { openDB } from "..";

export const PlantationBlockRepository = {
    async findAll(): Promise<PlantationBlock[]> {
        try {
            const db = await openDB();
            const plantationBlocks = await db.getAllAsync<PlantationBlock>('SELECT * FROM plantation_block');
            return plantationBlocks || [];
        } catch (error) {
            console.error('PlantationBlockRepository.findAll: ', error);
            return [];
        }
    },

    async findByUuid(uuid: string): Promise<PlantationBlock | null>{
        try {
            const db = await openDB();
            const plantation_block = await db.getFirstAsync<PlantationBlock>('SELECT * FROM plantation_block WHERE uuid_plantation_block = ?', [uuid]);
            return plantation_block || null;
        } catch (error) {
            console.error('PlantationBlockRepository.findByUuid: ', error);
            return null;
        }
    },

    async insertPlantationBlock(data: PlantationBlock): Promise<string>{
        try {
            const db = await openDB();
            const uuid = String(data.uuid_plantation_block);
            const name = data.name ?? "";
            const width = Number(data.width ?? 0);
            const height = Number(data.width ?? 0);
            const nb_sub_plot = Number(data.nb_sub_plot ?? 0);
            const geom = data.geom ?? "";
            const uuid_zone = String(data.uuid_zone);

            await db.runAsync(`INSERT INTO plantation_block (uuid_plantation_block, name, width, height, nb_sub_plot, geom, created_at, updated_at, is_synced, uuid_zone) VALUES (?, ?, ?, ?, ?, ?, datetime('now'), NULL, 0, ?)`, [uuid, name, width, height, nb_sub_plot, geom, uuid_zone]);

            return uuid;
        } catch (error) {
            console.error("PlantaitonBlockRepository.insertPlantationBlock error: ", error);
            throw error;
        }
    },

    async findAllPlantationBlockUpdatedSince(last_sync: Date | string): Promise<PlantationBlock[]>{
        try {
            const db = await openDB();
            const lastSyncIso = last_sync instanceof Date ? last_sync.toISOString() : String(last_sync);
            const sql = `SELECT uuid_plantation_block, name, width, height, nb_sub_plot, geom, created_at, updated_at, is_synced, uuid_zone
                FROM plantation_block
                WHERE (created_at IS NOT NULL AND created_at > ?)
                OR (updated_at IS NOT NULL AND updated_at > ?)
            `;
            const rows = db.getAllAsync<PlantationBlock>(sql, [lastSyncIso, lastSyncIso]);
            return rows || [];
        } catch (error) {
            console.error("PlantationBlockRepository.findAllPlantationBlockUpdatedSince : ", error);
            return [];
        }
    }
}