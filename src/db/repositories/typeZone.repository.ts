import { openDB } from '..';
import { Type_zone } from '@/src/types/entities/type_zone.entity';


export const TypeZoneRepository = {
    async findAll(): Promise<Type_zone[]>{
        try {
            const db = await openDB();
            const zones = await db.getAllAsync<Type_zone>(`SELECT * FROM type_zone`);
            return zones || [];
        } catch (error) {
            console.error('typezoneRepository.findAll error : ', error);
            return [];
        }
    },

    async findById(id: number): Promise<Type_zone | null>{
        try {
            const db = await openDB();
            const result = await db.getFirstAsync<Type_zone>(`SELECT * FROM type_zone WHERE id_type_zone = ?`, [id]);
            return result || null;
            
        } catch (error) {
            console.error('typezoneRepository.findById : ', error);
            return null;
        }
    }
}