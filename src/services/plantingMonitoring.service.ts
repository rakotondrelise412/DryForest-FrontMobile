import { PlantingMonitoringDTO } from "../types/dto/plantation.dto";
import { v4 as uuidv4 } from "uuid";
import { calculateCarbon, calculateDryAGB } from "../utils/carboneSequestered";
import { PlantingMonitoring } from "../types/entities/plantation.entity";
import { PlantingMonitoringRepository } from "../db/repositories/plantingMonitoring.repository";
import { PlantationService } from "./plantation.service";
import { SpeciesService } from "./species.service";
import { PlantationRepository } from "../db/repositories/plantation.repository";


export const PlantingMonitoringService = {
    
    
    async insertPlantingMonitoring(data: PlantingMonitoringDTO, markPlantationInactive?: boolean): Promise<string> {
        // CAS 1 : on marque la plantation comme inactive (status = false)
        if (markPlantationInactive === true) {
          const uuidPlant = String(data.uuid_plantation ?? "");
          if (!uuidPlant) throw new Error("UUID plantation requis pour mettre à jour le status.");
    
          // Mettre à jour le status (boolean) et marquer comme non-synchronisé pour push ultérieur.
          // Assure-toi que PlantationRepository.updatePlantationStatus accepte un boolean
          await PlantationRepository.updatePlantationStatus(uuidPlant, false);
    
          return uuidPlant;
        }
    
        // CAS 2 : comportement normal — création d'un PlantingMonitoring
        const uuid = uuidv4();
    
        const plantation = await PlantationService.findByUuid(String(data.uuid_plantation));
        let id_species = 0;
        if (!!plantation) { id_species = (plantation as any).id_species ?? 0; }
    
        const species = await SpeciesService.findById(id_species);
        let density = 0;
        if (!!species) {
          density = species.density ?? 0;
        }
    
        const biomasse = calculateDryAGB(Number(data.diameter), Number(data.height), density);
        const carbon_seq = calculateCarbon(biomasse);
    
        const plantingMon: PlantingMonitoring = {
          uuid_planting_monitoring: uuid,
          diameter: Number((data as any).diameter),
          height: Number((data as any).height),
          carbon_sequestered: carbon_seq,
          image: String(data.image ?? ""),
          date_planting_monitoring: data.date_planting_monitoring,
          auto_generation: data.auto_generation === undefined ? null : Number(data.auto_generation),
          uuid_plantation: String(data.uuid_plantation),
        };
    
        await PlantingMonitoringRepository.insertPlantingMonitoring(plantingMon);
    
        return uuid;
    },
    
    async findAllPlantingMonitoringUpdatedSince(last_sync: Date | string): Promise<PlantingMonitoring[]> {
        return await PlantingMonitoringRepository.findAllPlantingMonitoringUpdatedSince(last_sync);
    },
}