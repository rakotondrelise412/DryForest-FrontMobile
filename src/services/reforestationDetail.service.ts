import { ReforestationDetailRepository } from "../db/repositories/reforestationDetail.repository"
import { ReforestationDetailDTO } from "../types/dto/reforestationDetail.dto";
import { ReforestationDetail } from "../types/entities/reforestation.entity"
import { v4 as uuidv4 } from "uuid";


export const ReforestationDetailService = {
    async insertReforestation(data: ReforestationDetailDTO): Promise<string>{
        const uuid = uuidv4();
        if(data.uuid_reforestation === undefined || data.uuid_reforestation === null) return "Une reforestation est requise.";
        const reforestationDetail: ReforestationDetail = {
            uuid_reforestation_detail: uuid,
            quantity: Number((data as any).quantity),
            id_species: Number((data as any).id_species),
            uuid_reforestation: (data as any).uuid_reforestation,
        }
        
        return await ReforestationDetailRepository.insertRefDetail(reforestationDetail);
    },

    async findAllReforestationDetailUpdatedSince(last_sync: Date | string): Promise<ReforestationDetail[]> {
        return await ReforestationDetailRepository.findAllReforestationDetailUpdatedSince(last_sync);
    },
}