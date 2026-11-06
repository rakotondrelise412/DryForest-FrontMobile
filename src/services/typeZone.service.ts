import { TypeZoneRepository } from "../db/repositories/typeZone.repository";
import { Type_zone } from "../types/entities/type_zone.entity";


export const TypeZoneService = {
    async findAllTypeZone(): Promise<Type_zone[]>{
        return await TypeZoneRepository.findAll();
    },

    async findTypeZoneById(id: number): Promise<Type_zone | null>{
        return await TypeZoneRepository.findById(id);
    }
}