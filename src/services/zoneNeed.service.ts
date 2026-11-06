import { v4 as uuidv4 } from "uuid";
import { ZoneNeedRepository } from "../db/repositories/zoneNeed.repository";
import { ZoneNeed } from "../types/entities/zone.entity";
import { SpeciesZoneNeedDTO } from "../types/dto/zoneDTO.dto";
import { SpeciesZoneNeedService } from "./speciesZoneNeed.service";

export const ZoneNeedService = {

    async createZoneNeed(uuid_z: string, especeZoneNeed: SpeciesZoneNeedDTO[]): Promise<string>{
        if(uuid_z === "") throw new Error("Zone requise");
        
        const uuid = uuidv4();
        const zoneNeed: ZoneNeed = {
            uuid_zone_need: uuid,
            uuid_zone: uuid_z,
            created_at: undefined,
            updated_at: undefined,
            is_synced: false
        };
        const uuid_z_n = await ZoneNeedRepository.create(zoneNeed);
        
        for(const species_zone_need of especeZoneNeed){
            species_zone_need.uuid_zone_need = uuid_z_n;
            await SpeciesZoneNeedService.insertSpeciesZoneNeed(species_zone_need);
        }
        return uuid_z_n;
    },

    async findAllZoneNeedUpdatedSince(last_sync: Date | string): Promise<ZoneNeed[]> {
        return await ZoneNeedRepository.findAllZoneNeedUpdatedSince(last_sync);
    },

}