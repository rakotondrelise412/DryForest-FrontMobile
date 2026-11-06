import { useCallback, useState } from "react";
import { PatrolGroupService } from "../services/patrolGroup.service";
import { PatrolGroup } from "../types/entities/patrolGroup.entity";


export const usePatrolGroup = () =>{
    const [patrolGroups, setPatrolGroup] = useState<PatrolGroup[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadPatrolGroup = useCallback(async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const data = await PatrolGroupService.findAll();
            setPatrolGroup(data);
        } catch (error) {
            console.error(error);
            setError('Erreur lors du chargement des groupes de patrouilles.')
        } finally{
            setLoading(false);
        }
    }, []);

    return {
        patrolGroups, loading, error, refresh: loadPatrolGroup,
    }
}