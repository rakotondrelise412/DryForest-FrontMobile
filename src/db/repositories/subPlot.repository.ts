import { SubPlot } from "@/src/types/entities/subPlot.entity";
import { openDB } from "..";


export const SubPlotRepository = {

    async findAll(): Promise<SubPlot[]>{
        try {
            const db = await openDB();

            const supblots = await db.getAllAsync<SubPlot>(`SELECT uuid_sub_plot, name, width, height, location, uuid_plantation_block FROM sub_plot`);

            return supblots || [];
        } catch (error) {
            console.error('SubPlotRepository.findAll : ', error);
            return [];
        }
    },

    async findByUuid(uuid: string): Promise<SubPlot | null>{
        try {
            const db = await openDB();

            const sub_plot = await db.getFirstAsync<SubPlot>(`SELECT uuid_sub_plot, name, width, height, location, uuid_plantation_block FROM sub_plot WHERE uuid_sub_plot = ?`, [uuid]);
            
            return sub_plot;
        } catch (error) {
            console.error('SubPlotRepository.findByUuid : ', error);
            return null;
        }
    },

    async insertSubPlot(data: SubPlot): Promise<string> {
        try {
            const db = await openDB();
            const uuid = String(data.uuid_sub_plot);
            const name = data.name ?? "";
            const width = Number(data.width ?? 0);
            const height = Number(data.height ?? 0);
            const location = data.location ?? "";
            const uuid_plantation_block = String(data.uuid_plantation_block);

            await db.runAsync(`INSERT INTO sub_plot (uuid_sub_plot, name, width, height, location, created_at, updated_at, is_synced, uuid_plantation_block) VALUES (?, ?, ?, ?, ?, datetime('now'), NULL, 0, ?)`, [uuid, name, width, height, location, uuid_plantation_block]);

            return uuid;

        } catch (err) {
            console.error("zoneRepository.insertZone error:", err);
            throw err;
          }
    },

    async updateSubPlot(data: SubPlot): Promise<string> {
        try {
          const db = await openDB();
          const uuid = String(data.uuid_sub_plot);
          const name = data.name ?? "";
          const width = Number(data.width ?? 0);
          const height = Number(data.height ?? 0);
          const location = data.location ?? "";
          const uuid_plantation_block = String(data.uuid_plantation_block);
    
          const result = await db.runAsync(
            `UPDATE sub_plot
             SET name = ?, width = ?, height = ?, location = ?, updated_at = datetime('now'), is_synced = 0, uuid_plantation_block = ?
             WHERE uuid_sub_plot = ?`,
            [name, width, height, location, uuid_plantation_block, uuid]
          );
    
          // optionnel : tu peux vérifier result.changes si sqlite wrapper le fournit
          return uuid;
        } catch (err) {
          console.error("SubPlotRepository.updateSubPlot error:", err);
          throw err;
        }
    },

    async findUnupdatedByPlantationBlock(uuid_block: string): Promise<SubPlot[]> {
        try {
          const db = await openDB();
          // trim(location) = '' gère '' ou '   ' ; also check null
          const rows = await db.getAllAsync<SubPlot>(
            `SELECT uuid_sub_plot, name, width, height, location, uuid_plantation_block
             FROM sub_plot
             WHERE uuid_plantation_block = ? AND (location IS NULL OR trim(location) = '')`,
            [uuid_block]
          );
          return rows || [];
        } catch (error) {
          console.error('SubPlotRepository.findUnupdatedByPlantationBlock : ', error);
          return [];
        }
    },

    async findAllSubplotUpdatedSince(last_sync: Date | string): Promise<SubPlot[]>{
      try {
        const db = await openDB();
        const lastSyncIso = last_sync instanceof Date ? last_sync.toISOString() : String(last_sync);
        const sql = `SELECT uuid_sub_plot, name, width, height, location, created_at, updated_at, is_synced, uuid_plantation_block
                FROM sub_plot
                WHERE (created_at IS NOT NULL AND created_at > ?)
                OR (updated_at IS NOT NULL AND updated_at > ?)
                `;
        const rows = db.getAllAsync<SubPlot>(sql, [lastSyncIso, lastSyncIso]);

        return rows || [];
      } catch (error) {
        console.error("SubplotRepository.findAllSubplotUpdatedSince : ", error);
        return [];
      }
    }

}