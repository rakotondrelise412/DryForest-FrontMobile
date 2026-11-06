import { useCallback, useState } from "react";
import { ObservationPatrolDTO } from "../types/dto/observationPatrol.dto";
import { ObservationPatService } from "../services/observationPatrol.service";
import { isValidGeoJSON } from "../utils/geom";


export const useObservationPat = () =>{

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    type SubmitResult = { success: true; uuid: string } | { success: false; error: string };

    const validateData = (data: ObservationPatrolDTO): string | null =>{
        if (!(data.datetime_observation instanceof Date) || Number.isNaN(data.datetime_observation.getTime())) return "La date est invalide";
        if (!data.location || data.location.trim().length === 0) return "Les coordonnées sont requises.";
        if (!isValidGeoJSON(data.location)) return "La location fourni n'est pas un valide.";
        if (!data.description || data.description.trim().length === 0) return "La description est requise";
        if (typeof data.id_observation_patrol_type !== "number" || Number.isNaN(data.id_observation_patrol_type) || data.id_observation_patrol_type <= 0) return "Le type d'observation est requis.";
        if (typeof data.id_patrol_group !== "number" || Number.isNaN(data.id_patrol_group) || data.id_patrol_group <= 0) return "Le groupe de patrouille est requis.";
        // if (typeof data.id_user !== "number" || Number.isNaN(data.id_user) || data.id_user <= 0) return "L'utilisateur de patrouille est requise";
        if (data.uuid_zone === undefined || data.uuid_zone === null) return "La zone est requise.";

        return null;
    }

    const insertObservationPat = useCallback(async (data: ObservationPatrolDTO): Promise<SubmitResult> =>{
        setSubmitError(null);
        setSubmitSuccess(null);

        const validationError = validateData(data);
        if (validationError) {
            setSubmitError(validationError);
            return { success: false, error: validationError };
        }

        try {
            setSubmitting(true);
            const uuid = await ObservationPatService.insertObservationPat(data);
            setSubmitSuccess(`Observation durant la parouille créée (uuid: ${uuid})`);

            return { success: true, uuid};
        } catch (err: any) {
            const message = err instanceof Error ? err.message : "Erreur lors de la création d'observation patrouille";
            console.error("useObservationPat - insertObservationPat unrecoverable error:", err);
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
        insertObservationPat,
        resetForm,
    }
}