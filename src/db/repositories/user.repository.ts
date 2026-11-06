import { Users } from "@/src/types/entities/user.entity";
import { openDB } from "..";

export const UserRepository = {
    async getById(id: number): Promise<Users | null> {
        const db = await openDB();

        return await db.getFirstAsync<Users>(`SELECT * FROM users WHERE id_user = ?`, [id]);
    },
    
    async getByUsername(username: string): Promise<Users | null> {
        const db = await openDB();

        return await db.getFirstAsync<Users>(`SELECT * FROM users WHERE username = ?`, [username]);
    },

    async getAny(): Promise<Users | null> {
        const db = await openDB();

        return await db.getFirstAsync<Users>(`SELECT * FROM users LIMIT 1`);
    },

    async getIdSite(): Promise<number | null> {
        const db = await openDB();

        const result = await db.getFirstAsync<{id_site: number}>(
            `SELECT p.id_site FROM users u JOIN person p ON u.id_person = p.id_person LIMIT 1`
        );

        return result?.id_site ?? null;
    }
}