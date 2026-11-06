import { PlantationBlockRepository } from "../db/repositories/plantationBlock.repository";
import { PlantationBlockDTO } from "../types/dto/plantationBlock.dto";
import { SubPlotDTO } from "../types/dto/subPlot.dto";
import { PlantationBlock } from "../types/entities/plantationBlock.entity";
import { coordsToGeoJSON } from "../utils/geom";
import { v4 as uuidv4 } from "uuid";
import { SubPlotService } from "./subPlot.service";



export const PlantationBlockService = {

  async findAll(): Promise<PlantationBlock[]>{
    return await PlantationBlockRepository.findAll();
  },

  async findByUuid(uuid: string): Promise<PlantationBlock | null>{ return await PlantationBlockRepository.findByUuid(uuid); },

  async insertPlantationBlock(data: PlantationBlockDTO): Promise<string>{
      const uuid = uuidv4();

      let geomStr = "";
      if ((data as any).coords && Array.isArray((data as any).coords)) {
        geomStr = coordsToGeoJSON((data as any).coords);
      } else {
        geomStr = (data as any).geom ?? "";
      }

      const plantationBlock = {
          uuid_plantation_block: uuid,
          name: (data as any).name,
          width: Number((data as any).width),
          height: Number((data as any).height),
          nb_sub_plot: Number((data as any).nb_sub_plot),
          geom: geomStr,
          uuid_zone: (data as any).uuid_zone
      };
      
      await PlantationBlockRepository.insertPlantationBlock(plantationBlock);
      
      for (let index = 0; index < data.nb_sub_plot; index++) {
          const uuid_subplot = uuidv4();

          const sub_plot: SubPlotDTO = {
            uuid_sub_plot: uuid_subplot,
            name: "Plct_" + index,
            width: data.width / 2,
            height: data.height / data.nb_sub_plot,
            location: "",
            uuid_plantation_block: uuid
          }

          await SubPlotService.insertSubPlot(sub_plot);
        
      }

      return uuid;
  },

  async findAllPlantationBlockUpdatedSince(last_sync: Date | string): Promise<PlantationBlock[]> {
    return await PlantationBlockRepository.findAllPlantationBlockUpdatedSince(last_sync);
},
}