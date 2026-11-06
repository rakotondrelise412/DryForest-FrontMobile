import { useCallback, useState } from "react"
import { Severity } from "../types/entities/severity.entity"
import { SeverityService } from "../services/severity.service";

export const useSeverity = () => {
    const [severities, setSeverities] = useState<Severity[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadSeverities = useCallback( async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            const severities = await SeverityService.findAll();
            setSeverities(severities);
        } catch (error) {
            setError('Erreur lors de la chargement des niveaux de gravité!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        severities,
        loading,
        error,

        loadSeverities
    };
}