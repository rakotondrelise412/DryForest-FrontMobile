import { useCallback, useState } from "react"
import { Species } from "../types/entities/species.entity";
import { SpeciesService } from "../services/species.service";


export const useSpecies = () => {
    const [species, setSpecies] = useState<Species[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const loadSpecies = useCallback(async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            const species = await SpeciesService.findAll();
            setSpecies(species);
        } catch (error) {
            setError('Erreur lors de la chargement des espèces!')
            console.error(error);
        } finally{
            setLoading(false);
        }
    }, []);

    const loadSpeciesWithStock = useCallback( async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            const species = await SpeciesService.findAllWithStock();
            setSpecies(species);
        } catch (error) {
            setError('Erreur lors de la chargement des espèces!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        species,
        loading,
        error,
        
        refresh: loadSpecies,
        loadSpeciesWithStock
    }
}