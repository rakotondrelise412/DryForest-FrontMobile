import { SpeciesZoneNeedDTO } from "../types/dto/zoneDTO.dto";
import { v4 as uuidv4 } from "uuid";
import { SpeciesZoneNeed } from "../types/entities/zone.entity";
import { SpeciesZoneNeedRepository } from "../db/repositories/speciesZoneNeed.repository";


export const SpeciesZoneNeedService = {
    async insertSpeciesZoneNeed(data: SpeciesZoneNeedDTO): Promise<string>{
        const uuid = uuidv4();
        if(data.uuid_zone_need === undefined || data.uuid_zone_need === null) return "La besoin de la est requise.";
        const speciesZoneNeed: SpeciesZoneNeed = {
            uuid_species_zone_need: uuid,
            id_species: Number((data as any).id_species),
            uuid_zone_need: (data as any).uuid_zone_need,
        }
        
        return await SpeciesZoneNeedRepository.insertSpeciesZoneNeed(speciesZoneNeed);
    },

    async findAllSpeciesZoneNeedUpdatedSince(last_sync: Date | string): Promise<SpeciesZoneNeed[]>{
        return await SpeciesZoneNeedRepository.findAllUpdatedSince(last_sync);
    }
}