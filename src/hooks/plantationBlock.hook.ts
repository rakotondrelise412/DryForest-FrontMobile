import { useCallback, useState } from "react";
import { PlantationBlock } from "../types/entities/plantationBlock.entity";
import { PlantationBlockService } from "../services/plantationBlock.service";
import { PlantationBlockDTO } from "../types/dto/plantationBlock.dto";
import { isValidGeoJSON } from "../utils/geom";

export const usePlantationBlock = () => {
    const [plantationBlocks, setPlantationBlock] = useState<PlantationBlock[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    type SubmitResult = { success: true; uuid: string } | { success: false; error: string };

    const loadPlantationBlock = useCallback(async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const data = await PlantationBlockService.findAll();
            setPlantationBlock(data);
        } catch (error) {
            console.error(error);
            setError("Erreur lors du chargement des placeaux");
        } finally {
            setLoading(false);
        }
    }, []);

    const refreshPlantationBlock = useCallback(async (): Promise<void> => {
        await loadPlantationBlock();
    }, [loadPlantationBlock]);

    const validateData = (data: PlantationBlockDTO): string | null => {
        if (!data.name || data.name.trim().length === 0) return "Tsy maintsy misy ny anaran'ny placeau";
        if (typeof data.width !== "number" || Number.isNaN(data.width) || data.width <= 0) return "Ny sakany dia tsy maintsy isa mihoatra ny 0";
        if (typeof data.height !== "number" || Number.isNaN(data.height) || data.height <= 0) return "Ny haavon'ny placeau dia tsy maintsy isa mihoatra ny 0";
        if (typeof data.nb_sub_plot !== "number" || Number.isNaN(data.nb_sub_plot) || data.nb_sub_plot <= 0) return "Ny isan'ny placette dia tsy maintsy isa mihoatra ny 0";
        if (!data.geom || data.geom.trim().length === 0) return "Tsy maintsy misy ny coordonnées";
        if (!isValidGeoJSON(data.geom)) return "Diso coordonnées nomenao";
        if (data.uuid_zone === undefined || data.uuid_zone === null) return "Tsy maintsy misy ny zone";

        return null;
    }

    const insertPlantationBlock = useCallback(async (data: PlantationBlockDTO): Promise<SubmitResult> => {
        setSubmitError(null);
        setSubmitSuccess(null);

        const validationError = validateData(data);
        if (validationError) {
            setSubmitError(validationError);
            return { success: false, error: validationError };
        }

        try {
            setSubmitting(true);
            const uuid = await PlantationBlockService.insertPlantationBlock(data);

            setSubmitSuccess(`Tafiditra ny placeau nataonao`);

            return { success: true, uuid };
        } catch (error : any) {
            const message = error instanceof Error ? error.message : "Erreur lors de la création du placeau.";
            console.error("usePlantationBlock - insertPlantationBlock unrecoverable error:", error);
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
        plantationBlocks,
        loading,
        error,
        refreshPlantationBlock,

        submitting,
        submitError,
        submitSuccess,
        insertPlantationBlock,
        resetForm,
    };
}