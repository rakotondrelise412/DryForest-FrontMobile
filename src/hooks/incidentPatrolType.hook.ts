import { useCallback, useState } from "react";
import { IncidentPatrolType } from "../types/entities/patrolGroup.entity";
import { IncidentPatrolTypeService } from "../services/incidentPatrolType.service";


export const useIncidentPatrolType = () =>{
    const [incidentPatrolTypes, setIncidentPatrolType] = useState<IncidentPatrolType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadPatrolGroup = useCallback(async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const data = await IncidentPatrolTypeService.findAll();
            setIncidentPatrolType(data);
        } catch (error) {
            console.error(error);
            setError('Erreur lors du chargement des types d\'incident.')
        } finally{
            setLoading(false);
        }
    }, []);

    return {
        incidentPatrolTypes, loading, error, refresh: loadPatrolGroup,
    }
}