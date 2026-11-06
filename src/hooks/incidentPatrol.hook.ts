import { useCallback, useState } from "react";
import { IncidentPatrolDTO } from "../types/dto/incidentPatrol.dto";
import { IncidentPatrolService } from "../services/incidentPatrol.service";
import { isValidGeoJSON } from "../utils/geom";


export const useIncidentPatrol = () =>{

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    type SubmitResult = { success: true; uuid: string } | { success: false; error: string };

    const validateData = (data: IncidentPatrolDTO): string | null =>{
        if (!(data.datetime_incident instanceof Date) || Number.isNaN(data.datetime_incident.getTime())) return "La date est invalide";
        if (!data.location || data.location.trim().length === 0) return "Les coordonnées sont requises.";
        if (!isValidGeoJSON(data.location)) return "La location fourni n'est pas un valide.";
        if (!data.description || data.description.trim().length === 0) return "La description est requise";
        if (!data.image || data.image.trim().length === 0) return "L'image est requise.";
        if (typeof data.id_patrol_group !== "number" || Number.isNaN(data.id_patrol_group) || data.id_patrol_group <= 0) return "Le groupe de patrouille est requis.";
        if (data.uuid_zone === undefined || data.uuid_zone === null) return "La zone est requise.";
        if (data.uuid_plantation_block === undefined || data.uuid_plantation_block === null) return "Le placeau est requise.";
        if (typeof data.id_incident_patrol_type !== "number" || Number.isNaN(data.id_incident_patrol_type) || data.id_incident_patrol_type <= 0) return "Le type d'incident est requis.";
        if (typeof data.id_severity !== "number" || Number.isNaN(data.id_severity) || data.id_severity <= 0) return "La gravité de l'incident n'est pas encore definie.";
        // if (typeof data.id_user !== "number" || Number.isNaN(data.id_user) || data.id_user <= 0) return "L'utilisateur de patrouille est requise";

        return null;
    };

    const insertIncidentPatrol = useCallback(async (data: IncidentPatrolDTO): Promise<SubmitResult> =>{
        setSubmitError(null);
        setSubmitSuccess(null);

        const validationError = validateData(data);
        if (validationError) {
        setSubmitError(validationError);
        return { success: false, error: validationError };
        }

        try {
            setSubmitting(true);
            const uuid = await IncidentPatrolService.insertIncidentPatrol(data);
            setSubmitSuccess(`Incident durant la parouille créée (uuid: ${uuid})`);

            return { success: true, uuid};
        } catch (err: any) {
            const message = err instanceof Error ? err.message : "Erreur lors de la création d'incident patrouille";
            console.error("useIncidentPatrol - insertIncidentPatrol unrecoverable error:", err);
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
        insertIncidentPatrol,
        resetForm,
    }
}