import { useCallback, useState } from "react";
import { Plantation } from "../types/entities/plantation.entity";
import { PlantationService } from "../services/plantation.service";
import { PlantationDTO } from "../types/dto/plantation.dto";


export const usePlantation = () =>{
    const [plantations, setPlantation] = useState<Plantation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    type SubmitResult = { success: true; uuid: string } |  { success: false; error: string };

    const loadPlantation = useCallback(async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const data = await PlantationService.findAll();
            setPlantation(data);
        } catch (error) {
            console.error(error);
            setError("Failed to load plantations");
        } finally {
            setLoading(false);
        }
    }, []);

    const refreshPlantation = useCallback(async (): Promise<void> =>{
        await loadPlantation();
    }, [loadPlantation]);

    const validateData = (data: PlantationDTO, uuid_zone: string): string | null =>{
        if (typeof data.diameter !== "number" || Number.isNaN(data.diameter) || data.diameter <= 0)return "Ny diametran'ny hazo dia mila isa mihoatra ny 0";
        if (typeof data.height !== "number" || Number.isNaN(data.height) || data.height <= 0)return "Ny haavon'ny hazo dia mila isa mihoatra ny 0";
        if (!data.image || data.image.trim().length === 0) return "Sary ny hazo dia ilaina";
        if (!(data.date_plantation instanceof Date) || Number.isNaN(data.date_plantation.getTime())) return "Ny daty fambolena dia tsy mety";
        if (data.uuid_sub_plot === undefined || data.uuid_sub_plot === null) return "Ny sub-plot dia ilaina";
        if (uuid_zone === undefined || uuid_zone === null) return "Ny zone dia ilaina";

        return null;
    }

    const insertPlantation = useCallback(async (data: PlantationDTO, uuid_zone: string): Promise<SubmitResult> =>{
        setSubmitError(null);
        setSubmitSuccess(null);

        const validationError = validateData(data, uuid_zone);
        if (validationError) {
            setSubmitError(validationError);
            return { success: false, error: validationError };
        }

        try {
            setSubmitting(true);
            const uuid = await PlantationService.insertPlantation(data, uuid_zone);
            setSubmitSuccess(`Tafiditra ny fambolena nataonao `);
            return {success: true, uuid};
        } catch (error: any) {
            const message = error instanceof Error ? error.message : "Erreur lors de la création de la plantation.";
            if (error && (error as any).name == "BusinessError") {
                setSubmitError(message);

            } else {
                console.error("usePlantation - insertPlantation unreconverable error: ", error);
                setSubmitError(message);
            }
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
        plantations,
        loading,
        error,
        refreshPlantation,

        submitting,
        submitError,
        submitSuccess,
        insertPlantation,
        resetForm,
    }
}