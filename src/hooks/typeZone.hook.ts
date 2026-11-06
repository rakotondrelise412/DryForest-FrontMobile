import { useCallback, useEffect, useState } from "react"
import { Type_zone } from "../types/entities/type_zone.entity"
import { TypeZoneService } from "../services/typeZone.service";


export const useTypeZone = () => {
    const [typeZones, setTypeZones] = useState<Type_zone[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<String | null>(null);

    const loadTypeZone = useCallback(async (): Promise<void> => {
        try{
            setLoading(true);
            setError(null);
            const data = await TypeZoneService.findAllTypeZone();
            setTypeZones(data);
        } catch (error){
            setError("Erreur lors du chargement des types de zones");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);      

    return{
        typeZones,
        loading,
        error,
        refresh: loadTypeZone
    };
};