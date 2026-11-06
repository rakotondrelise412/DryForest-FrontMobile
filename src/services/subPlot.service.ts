import { SubPlotRepository } from "../db/repositories/subPlot.repository"
import { SubPlotDTO } from "../types/dto/subPlot.dto";
import { SubPlot } from "../types/entities/subPlot.entity";
import { coordsToGeoJSON } from "../utils/geom";


export const SubPlotService = {

    async findAll(): Promise<SubPlot[]>{
        return await SubPlotRepository.findAll();
    },

    async findByUuid(uuid: string): Promise<SubPlot | null>{
        return await SubPlotRepository.findByUuid(uuid);
    },

    async findUnupdatedByPlantationBlock(uuid_block: string): Promise<SubPlot[]>{
        return await SubPlotRepository.findUnupdatedByPlantationBlock(uuid_block);
    },
      

    async insertSubPlot(data: SubPlotDTO): Promise<string>{

        if (data.uuid_sub_plot === undefined || data.uuid_sub_plot === null) throw new Error("Placette requise");

        let locationStr = "";
        if ((data as any).location && Array.isArray((data as any).location)) {
            locationStr = coordsToGeoJSON((data as any).location);
        } else {
            locationStr = (data as any).geom ?? "";
        }
        
        const subPlot: SubPlot = {
            uuid_sub_plot: data.uuid_sub_plot,
            name: (data as any).name,
            width: Number((data as any).width),
            height: Number((data as any).height),
            location: locationStr,
            uuid_plantation_block: data.uuid_plantation_block
        };

        await SubPlotRepository.insertSubPlot(subPlot);
        return data.uuid_sub_plot;
    },

    async updateSubPlot(data: SubPlotDTO & { uuid_sub_plot: string }): Promise<string> {
        // prépare l'entity
        const entity: SubPlot = {
          uuid_sub_plot: String(data.uuid_sub_plot),
          name: data.name,
          width: Number(data.width),
          height: Number(data.height),
          location: data.location,
          uuid_plantation_block: data.uuid_plantation_block,
        };
    
        return await SubPlotRepository.updateSubPlot(entity);
    },

    async findAllSubPlotUpdatedSince(last_sync: Date | string): Promise<SubPlot[]> {
        return await SubPlotRepository.findAllSubplotUpdatedSince(last_sync);
    },
}