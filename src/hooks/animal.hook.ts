import { useCallback, useState } from "react";
import { Animal } from "../types/entities/animalTracking.entity";
import { AnimalService } from "../services/animal.service";


export const useAnimal = () => {
    const [animals, setAnimal] = useState<Animal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadAnimal = useCallback(async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const data = await AnimalService.findAll();
            setAnimal(data);
        } catch (error) {
            console.error(error);
            setError('Erreur lors du chargement des animaux.');
        } finally{
            setLoading(false);
        }
    }, []);

    return {
        animals, loading, error, refresh: loadAnimal,
    }
}