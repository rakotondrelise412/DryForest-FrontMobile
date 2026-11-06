
import { useCallback, useState } from "react";
import { ObservationPatrolTypeService } from "../services/observationPatrolType.service";
import { ObservationPatrolType } from "../types/entities/ObservationPatrol.entity";


export const useObservationPatrolType = () =>{
    const [observationPatrolTypes, setObservationPatrolType] = useState<ObservationPatrolType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadObservationPatrolType = useCallback(async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const data = await ObservationPatrolTypeService.findAll();
            setObservationPatrolType(data);
        } catch (error) {
            console.error(error);
            setError('Erreur lors du chargement des types d\'observation.')
        } finally{
            setLoading(false);
        }
    }, []);

    return {
        observationPatrolTypes, loading, error, refresh: loadObservationPatrolType,
    }
}