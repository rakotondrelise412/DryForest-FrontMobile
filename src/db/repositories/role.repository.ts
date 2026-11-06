
import { Role } from "@/src/types/entities/user.entity";
import { openDB } from "..";

export const RoleRepository = {
    async getAll(): Promise<Role[]> {
        const db = await openDB();

        return await db.getAllAsync(`SELECT * FROM role`);
    },

    async getById(id: number): Promise<Role | null> {
        const db = await openDB();
        
        return await db.getFirstAsync<Role>(`SELECT * FROM role WHERE id_role = ?`, [id]);
    }
};