import { useCallback, useState } from "react";
import { isValidGeoJSON } from "../utils/geom";
import { AnimalTrackingDetailDTO, AnimalTrackingDTO } from "../types/dto/animalTracking.dto";
import { AnimalTrackingService } from "../services/animalTracking.service";


export const useAnimalTracking = () => {

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    type SubmitResult = { success: true; uuid: string } | { success: false; error: string };

    const validateData = (data: AnimalTrackingDTO, detail: AnimalTrackingDetailDTO[]): string | null => {
        if (data.uuid_plantation_block === undefined || data.uuid_plantation_block === null) return "Le placeau est requis.";
        if (!data.description || data.description.trim().length === 0) return "Le nom est requis.";
        if (!data.location || data.location.trim().length === 0) return "Les coordonnées sont requises.";
        if (!isValidGeoJSON(data.location)) return "La location fourni n'est pas un valide.";
        if (data.uuid_plantation_block === undefined || data.uuid_plantation_block === null || typeof data.uuid_plantation_block !== "string") return "Le placeau est requis.";

        if (!Array.isArray(detail) || detail.length === 0) return "Au moins un animal doit être renseigné.";
        for (const dtl of detail){
            if (typeof dtl.id_animal !== "number" || Number.isNaN(dtl.id_animal) || dtl.id_animal <= 0) return "L'animal indiquer n'est pas valide";
            if (typeof dtl.have_seen !== "number" || ![0, 1].includes(dtl.have_seen)) return "Le champ 'have_seen' doit être 0 ou 1."; {/* Je ne suis pas trop d'accord avec ca hein */}
        }
        return null;
    }

    const insertAnimalTracking = useCallback(async (data: AnimalTrackingDTO, detail: AnimalTrackingDetailDTO[]): Promise<SubmitResult> =>{
        setSubmitError(null);
        setSubmitSuccess(null);

        const validationError = validateData(data, detail);
        if (validationError) {
            setSubmitError(validationError);
            return { success: false, error: validationError};
        }

        try {
            setSubmitting(true);
            const uuid = await AnimalTrackingService.insertAnimalTracking(data, detail);
            setSubmitSuccess(`Suivi animal créée (uuid: ${uuid})`);
            return { success: true, uuid };
        } catch (error : any){
            const message = error instanceof Error ? error.message : "Erreur lors de la création du suivi des animaux";
            console.error("useAnimalTracking - insertAnimalTracking unrecoverable error: ", error);
            setSubmitError(message);
            return { success: false, error: message };
        } finally {
            setSubmitting(false);
        }

    }, []);

    const resetForm = useCallback(() => {
        setSubmitting(false);
        setSubmitError(null);
        setSubmitSuccess(null);
    }, []);

    return {
        submitting,
        submitError,
        submitSuccess,
        insertAnimalTracking,
        resetForm
    }
}