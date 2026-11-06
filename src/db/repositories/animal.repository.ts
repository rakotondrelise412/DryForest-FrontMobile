import { Animal } from '@/src/types/entities/animalTracking.entity';
import { openDB } from '..';

export const AnimalRepository = {
    async findAll(): Promise<Animal[]> {
        try {
            const db = await openDB();
            const animals = db.getAllAsync<Animal>('SELECT * FROM animal');
            return animals ||[];
        } catch (error) {
            console.error('AnimalRepository.findAll: ', error);
            return [];
        }
    },

    async findById(id: number): Promise<Animal | null>{
        try {
            const db = await openDB();
            const result = await db.getFirstAsync<Animal>('SELECT * FROM animal WHERE id_animal = ?', [id]);

            return result || null;
        } catch (error) {
            console.error('AnimalRepository.findById: ', error);
            return null;
        }
    }
}