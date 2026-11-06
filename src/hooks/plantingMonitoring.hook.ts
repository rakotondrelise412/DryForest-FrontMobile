import { useCallback, useState } from "react";
import { PlantingMonitoringDTO } from "../types/dto/plantation.dto";
import { PlantingMonitoringService } from "../services/plantingMonitoring.service";

export const usePlantingMonitoring = () => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    type SubmitResult = { success: true; uuid: string } | { success: false; error: string };
    
    const validateData = (data: PlantingMonitoringDTO): string | null => {
        if (typeof data.diameter !== "number" || Number.isNaN(data.diameter) || data.diameter <= 0) return "Le diametre doit être un nombre > 0";
        if (typeof data.height !== "number" || Number.isNaN(data.height) || data.height <= 0) return "La hauteur doit être un nombre > 0";
        if (!data.image || data.image.trim().length === 0) return "L'image est requise.";
        if (!(data.date_planting_monitoring instanceof Date) || Number.isNaN(data.date_planting_monitoring.getTime())) return "La date est invalide";
        if (data.auto_generation !== undefined && data.auto_generation !== null) {
            const num = Number(data.auto_generation);
            if (Number.isNaN(num) || !Number.isInteger(num) || num < 0) return "Auto-generation doit être un nombre positif";
        }
        if (data.uuid_plantation === undefined || data.uuid_plantation === null) return "La placette est requise";
        return null;
    }

    const insertPlantingMonitoring = useCallback(async (data: PlantingMonitoringDTO, markPlantationInactive?: boolean): Promise<SubmitResult> =>{
        setSubmitError(null);
        setSubmitSuccess(null);

        const validationError = validateData(data);
        if (validationError) {
            setSubmitError(validationError);
            return { success: false, error: validationError};
        }

        try {
            setSubmitting(true);
            const uuid = await PlantingMonitoringService.insertPlantingMonitoring(data, markPlantationInactive);

            setSubmitSuccess(`Suivi plantation créée (uuid: ${uuid})`);

            return { success: true, uuid };
        } catch (error : any) {
            const message = error instanceof Error ? error.message : "Erreur lors de la création du placeau.";
            console.error("usePlantingMonitoring - insertPlantationBlock unrecoverable error: ", error);
            return { success: false, error: message};
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
        insertPlantingMonitoring,
        resetForm,
    }
}