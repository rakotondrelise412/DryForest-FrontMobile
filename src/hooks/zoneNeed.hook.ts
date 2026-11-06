import { useCallback, useState } from "react";
import { ZoneNeedService } from "../services/zoneNeed.service";
import { SpeciesZoneNeedDTO } from "../types/dto/zoneDTO.dto";


export const useZoneNeed = () => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    type SubmitResult = { success: true; uuid: string } | { success: false; error: string };

    const validate = (uuid_zone: string, speciesIds: SpeciesZoneNeedDTO[]): string | null => {
        if (!uuid_zone || typeof uuid_zone !== "string" || uuid_zone.trim() === "") return "La zone est requise.";

        if (!Array.isArray(speciesIds) || speciesIds.length === 0) {
            const msg = "Au moins une seul espèce doit être sélectionée";
            setSubmitError(msg);
        }
        for(const id of speciesIds){
            if (typeof id !== "number" || Number.isNaN(id) || id <= 0) {
                const msg = "Liste d'espèces invalide";
                setSubmitError(msg);
            }
        }
        return null;
    }

    const insertZoneNeed = useCallback(async (zoneUuid: string, speciesIds: SpeciesZoneNeedDTO[]): Promise<SubmitResult> => {
        setSubmitError(null);
        setSubmitSuccess(null);
        
        const validationError = validate(zoneUuid, speciesIds);
        if(validationError){
            setSubmitError(validationError);
            return { success: false, error: validationError };
        }
        try {
            setSubmitting(true);
            const uuid = await ZoneNeedService.createZoneNeed(zoneUuid, speciesIds);
            const successMsg = `Besoin enregistré (group uuid: ${uuid})`;
            setSubmitSuccess(successMsg);
            return { success: true, uuid};
        } catch (error: any) {
            const message = error instanceof Error ? error.message : "Erreur lors de l'enregistrement des besoins";
            console.error("useZoneNeed - submitZoneNeed error: ", error);
            setSubmitError(message);
            return { success: false, error: message};
        } finally {
            setSubmitting(false);
        }
    }, []);

    const reset = useCallback(() =>{
        setSubmitting(false);
        setSubmitError(null);
        setSubmitSuccess(null);
    }, []);

    return {
        submitting,
        submitError,
        submitSuccess,
        insertZoneNeed,
        reset
    };
};