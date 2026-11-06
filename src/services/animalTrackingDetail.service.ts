
import { AnimalTrackingDetailRepository } from "../db/repositories/animalTrackingDetail.repository";
import { AnimalTrackingDetailDTO } from "../types/dto/animalTracking.dto";
import { AnimalTrackingDetail } from "../types/entities/animalTracking.entity";
import { v4 as uuidv4 } from "uuid";

export const AnimalTrackingDetailService = {
    async insertAnimalTrackingDetail(data: AnimalTrackingDetailDTO): Promise<string>{
        const uuid = uuidv4();

        const animalTrackingDetail: AnimalTrackingDetail = {
            uuid_animal_tracking_detail: uuid,
            have_seen: Number((data as any).have_seen),
            id_animal: Number((data as any).id_animal),
            uuid_animal_tracking: String((data as any).uuid_animal_tracking)
        }

        await AnimalTrackingDetailRepository.insertAnimalTrackingDetail(animalTrackingDetail);

        return uuid;
    }
}