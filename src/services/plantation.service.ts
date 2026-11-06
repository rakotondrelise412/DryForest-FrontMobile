import { PlantationRepository } from "../db/repositories/plantation.repository";
import { PlantationDTO } from "../types/dto/plantation.dto";
import { Plantation } from "../types/entities/plantation.entity";
import { v4 as uuidv4 } from "uuid";
import { SpeciesService } from "./species.service";
import { calculateCarbon, calculateDryAGB } from "../utils/carboneSequestered";
import { ReforestationRepository } from "../db/repositories/reforestation.repository";
import { SubPlotRepository } from "../db/repositories/subPlot.repository";
import { PlantationBlockRepository } from "../db/repositories/plantationBlock.repository";

class BusinessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BusinessError";
  }
}

export const PlantationService = {
    async findAll(): Promise<Plantation[]> {
        return await PlantationRepository.findAll();
    },

    async findByUuid(uuid: string): Promise<Plantation | null>{ return await PlantationRepository.findByUuid(uuid); },

    async insertPlantation(data: PlantationDTO, uuid_zone: string): Promise<string>{
        const uuid = uuidv4();
    
        // vérifie que l'espèce existe (optionnel mais utile)
        const species = await SpeciesService.findById(data.id_species);
        let density = 0;
        if (species) density = species.density ?? 0;
    
        const biomasse = calculateDryAGB(data.diameter, data.height, density);
        const carbon_seq = calculateCarbon(biomasse);
    
        // Récupère la DERNIERE reforestation sur la zone
        const lastRefOnZone = await ReforestationRepository.getLastReforestationByZone(uuid_zone);
        // --- NO REFORESTATION: on refuse l'insertion et on remonte le message demandé ---
        if (!lastRefOnZone || !(lastRefOnZone as any).uuid_reforestation) {
          // message exact demandé par toi
          throw new BusinessError("Il n'y a pas encore une reforesation dans cette zone choisi");
        }
    
        const uuid_ref = (lastRefOnZone as any).uuid_reforestation;
    
        // récupère le nombre déjà planté pour la ref + subplot
        const last_number = await PlantationRepository.getTotalPlantationByRefAndSubPlot(uuid_ref, data.uuid_sub_plot);
        console.log("Last number : " + last_number);

        const sub_plot = await SubPlotRepository.findByUuid(data.uuid_sub_plot);
        if(!sub_plot){
          throw new BusinessError("Placette introuvable");
        }
        const subPlotName = sub_plot.name;
        const uuid_pl = sub_plot.uuid_plantation_block;
        const plantation_block = await PlantationBlockRepository.findByUuid(uuid_pl);

        if(!plantation_block){
          throw new BusinessError("Placeau introuvable");
        }
        const plantationBlockName = plantation_block.name;
    
        let plante_number = "Plt_";
        const number = 1 + (last_number ?? 0);
        plante_number = plantationBlockName + "_" + subPlotName + "_Plt_" + number;
    
        const plantation: Plantation = {
          uuid_plantation: uuid,
          diameter: Number((data as any).diameter),
          height: Number((data as any).height),
          carbon_sequestered: carbon_seq,
          image: String(data.image),
          date_plantation: data.date_plantation,
          plant_number: plante_number,
          id_species: Number((data as any).id_species),
          uuid_sub_plot: (data as any).uuid_sub_plot,
          uuid_reforestation: uuid_ref,
          status: true
        };
    
        await PlantationRepository.insertPlantation(plantation);
    
        return uuid;
  },

  async findAllPlantationUpdatedSince(last_sync: Date | string): Promise<Plantation[]> {
    return await PlantationRepository.findAllPlantationUpdatedSince(last_sync);
  },
}