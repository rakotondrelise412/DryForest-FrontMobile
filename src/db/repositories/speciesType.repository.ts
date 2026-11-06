import { openDB } from '..';
import { SpeciesType } from '@/src/types/entities/species.entity';

export const SpeciesTypeRepository = {
  async getAll(): Promise<SpeciesType[]> {
    const db = await openDB();

    return await db.getAllAsync(`SELECT * FROM species_type`);
  },

  async getById(id: number): Promise<SpeciesType | null> {
    const db = await openDB();

    return await db.getFirstAsync<SpeciesType>(`SELECT * FROM species_type WHERE id_species_type = ?`, [id]);
  }
};
