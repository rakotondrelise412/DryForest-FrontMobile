import { AnimalTracking } from "@/src/types/entities/animalTracking.entity";
import { openDB } from "..";


export const AnimalTrackingRepository = {
    async insertAnimalTracking(data: AnimalTracking): Promise<string>{
        try {
            const uuid = String(data.uuid_animal_tracking);
            const date_tracking = data.date_tracking.toISOString();
            const description = data.description || null;
            const location = data.location || null;
            const uuid_plantation_block = String(data.uuid_plantation_block);

            const db = await openDB();
            await db.runAsync('INSERT INTO animal_tracking (uuid_animal_tracking, date_tracking, description, location, uuid_plantation_block) VALUES (?, ?, ?, ?, ?, NULL)', [uuid, date_tracking, description, location, uuid_plantation_block]);

            return uuid;

        } catch (error) {
            console.error('AnimalTrackingRepository.insertAnimalTracking: ', error);
            throw error;
        }
    }
}