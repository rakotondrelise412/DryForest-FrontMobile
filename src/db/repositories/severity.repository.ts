import { Severity } from "@/src/types/entities/severity.entity";
import { openDB } from "..";

export const SeverityRepository = {
    async getAll(): Promise<Severity[]> {
        const db = await openDB();

        return await db.getAllAsync(`SELECT * FROM severity`);
    },

    async getById(id: number): Promise<Severity | null> {
        const db = await openDB();

        return await db.getFirstAsync<Severity>(`SELECT * FROM severity WHERE id_severity = ?`, [id]);
    }
}