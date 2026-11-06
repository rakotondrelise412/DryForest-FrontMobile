import { AnimalTrackingDetail } from "@/src/types/entities/animalTracking.entity";
import { openDB } from "..";


export const AnimalTrackingDetailRepository = {
    async insertAnimalTrackingDetail(data: AnimalTrackingDetail): Promise<string>{
        try {
            const uuid = String(data.uuid_animal_tracking_detail);
            const have_seen = Number(data.have_seen ?? 0);
            const id_animal = Number(data.id_animal ?? 0);
            const uuid_animal_tracking = String(data.uuid_animal_tracking);

            const db = await openDB();
            await db.runAsync('INSERT INTO animal_tracking_detail (uuid_animal_tracking_detail, have_seen, id_animal, uuid_animal_tracking, updated_at) VALUES (?, ?, ?, ?, NULL)', [uuid, have_seen, id_animal, uuid_animal_tracking]);

            return uuid;
        } catch (error) {
            console.error('AnimalTrackingDetailRepository.insertAnimalTrackingDetail: ', error);
            throw error;
        }
    }
}