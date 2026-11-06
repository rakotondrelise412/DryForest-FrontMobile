import { AnimalTrackingRepository } from "../db/repositories/animalTracking.repository";
import { AnimalTrackingDetailDTO, AnimalTrackingDTO } from "../types/dto/animalTracking.dto";
import { AnimalTracking } from "../types/entities/animalTracking.entity";
import { coordsToGeoJSON } from "../utils/geom";
import { v4 as uuidv4 } from "uuid";
import { AnimalTrackingDetailService } from "./animalTrackingDetail.service";


export const AnimalTrackingService = {
    async insertAnimalTracking(data: AnimalTrackingDTO, animal_tracking_detail: AnimalTrackingDetailDTO[]): Promise<string>{
        const uuid = uuidv4();

        let locationStr = "";
        if ((data as any).location && Array.isArray((data as any).location)) {
            locationStr = coordsToGeoJSON((data as any).location);
        } else {
            locationStr = (data as any).geom ?? "";
        }

        const animalTracking: AnimalTracking = {
            uuid_animal_tracking: uuid,
            date_tracking: data.date_tracking,
            description: String(data.description),
            location: locationStr,
            uuid_plantation_block: data.uuid_plantation_block
        }

        const anim_track = await AnimalTrackingRepository.insertAnimalTracking(animalTracking);

        for(const anim_track_detail of animal_tracking_detail){
            anim_track_detail.uuid_animal_tracking = anim_track;
            await AnimalTrackingDetailService.insertAnimalTrackingDetail(anim_track_detail);
        }

        return uuid;
    }
}