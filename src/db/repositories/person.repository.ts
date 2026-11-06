import { Person } from "@/src/types/entities/user.entity";
import { openDB } from "..";

export const PersonRepository = {
    async getAll(): Promise<Person[]> {
        try {
            const db = await openDB();

            return db.getAllAsync<Person>('SELECT * FROM person') || [];
        } catch (error) {
            console.error('PersonRepository.findAll: ', error);
            return [];
        }
    },

    async getById(id: number): Promise<Person | null>{
        const db = await openDB();

        return await db.getFirstAsync<Person>('SELECT * FROM person WHERE id_person = ?', [id]);
    }
}