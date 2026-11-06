import { Species } from "@/src/types/entities/species.entity";
import { openDB } from "..";

export const SpeciesRepository = {
    async getAll(): Promise<Species[]> {
        const db = await openDB();

        return await db.getAllAsync(`SELECT * FROM species`);
    },

    async getById(id: number): Promise<Species | null> {
        const db = await openDB();

        return await db.getFirstAsync<Species>(`SELECT * FROM species WHERE id_species = ?`, [id]);
    },

    async getAllWithStock(): Promise<Species[]> {
        const db = await openDB();

        return await db.getAllAsync<Species>(`SELECT * FROM v_species_stock`);
    },

    async getWithStockById(id: number): Promise<Species | null> {
        const db = await openDB();

        return await db.getFirstAsync<Species>(`SELECT * FROM v_species_stock WHERE id_species = ?`, [id]);
    }
}