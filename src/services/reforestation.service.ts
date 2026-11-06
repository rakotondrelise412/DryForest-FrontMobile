import { ReforestationRepository } from "../db/repositories/reforestation.repository";
import { ReforestationDTO } from "../types/dto/reforestation.dto";
import { v4 as uuidv4 } from "uuid";
import { Reforestation } from "../types/entities/reforestation.entity";
import { ReforestationDetailDTO } from "../types/dto/reforestationDetail.dto";
import { ReforestationDetailService } from "./reforestationDetail.service";


export const ReforestationService = {
    async insertReforestation(data: ReforestationDTO, refDetail: ReforestationDetailDTO[]): Promise<string>{
    
        const uuid = uuidv4();
        const reforestation: Reforestation = {
            uuid_reforestation: uuid,
            date_reforestation: data.date_reforestation,
            quantity: Number((data as any).quantity),
            uuid_zone: (data as any).uuid_zone,
        }
        const uuid_ref = await ReforestationRepository.createReforestation(reforestation);
        for (const rd of refDetail) {
            rd.uuid_reforestation = uuid_ref;
            await ReforestationDetailService.insertReforestation(rd);
        }
        return uuid_ref;
    },

    async findAllReforestationUpdatedSince(last_sync: Date | string): Promise<Reforestation[]> {
        return await ReforestationRepository.findAllReforestationUpdatedSince(last_sync);
    },
}