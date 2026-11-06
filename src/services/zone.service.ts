import { ZoneRepository } from "../db/repositories/zone.repository";
import { ZoneDTO } from "../types/dto/zoneDTO.dto";
import { Zone } from "../types/entities/zone.entity";
import { coordsToGeoJSON } from "../utils/geom";
import { generateUniqueUuidForTable } from "../utils/uuid";


export const ZoneService = {
    async findAllZone(): Promise<Zone[]>{
        return await ZoneRepository.findAll();
    },

    async findZoneById(id: string): Promise<Zone | null>{
        return await ZoneRepository.findByUuid(id);
    },

    // async createZone(data: ZoneDTO):Promise<void>{
    //     const uuid = await generateUniqueUuidForTable("zone","uuid_zone");

    //     const zone: Zone = {
    //         uuid_zone: uuid,
    //         name: data.name,
    //         area: data.area,
    //         geom: data.geom,
    //         id_type_zone: data.id_type_zone
    //     };

    //     await zoneRepository.insertZone(zone);
    // } 

    async createZone(data: ZoneDTO): Promise<string> {
        // validation minimale (tu peux enrichir)
        if (!data.name || data.name.trim() === "") throw new Error("Nom requis");
        if (!data.area || Number.isNaN(Number(data.area))) throw new Error("Superficie invalide");
        if (data.id_type_zone === undefined || data.id_type_zone === null) throw new Error("Type de zone requis");
    
        const uuid = await generateUniqueUuidForTable("zone", "uuid_zone");
    
        // si data contient coords -> construire geom, sinon utiliser data.geom
        let geomStr = "";
        if ((data as any).coords && Array.isArray((data as any).coords)) {
          geomStr = coordsToGeoJSON((data as any).coords);
        } else {
          geomStr = (data as any).geom ?? "";
        }
    
        const zone = {
          uuid_zone: uuid,
          name: (data as any).name,
          area: Number((data as any).area),
          geom: geomStr,
          id_type_zone: Number((data as any).id_type_zone),
          created_at: undefined,
          updated_at: undefined,
          is_synced: false
        };
    
        await ZoneRepository.insertZone(zone);
        return uuid;
      },

    async findAllZoneUpdatedSince(last_sync: Date | string): Promise<Zone[]> {
        return await ZoneRepository.findAllZoneUpdatedSince(last_sync);
    },
}