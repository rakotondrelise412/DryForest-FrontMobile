import { useCallback, useEffect, useState } from "react";
import { SubPlot } from "../types/entities/subPlot.entity";
import { SubPlotService } from "../services/subPlot.service";
import { SubPlotDTO } from "../types/dto/subPlot.dto";
import { isValidGeoJSON } from "../utils/geom";


export const useSubPlot = () => {
    const [subPlots, setSubPlot] = useState<SubPlot[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    const [unupdatedSubPlots, setUnupdatedSubPlots] = useState<SubPlot[]>([]);
    const [loadingUnupdated, setLoadingUnupdated] = useState<boolean>(false);

    type SubmitResult = { success: true; uuid: string } | { success: false; error: string };
    
    const loadSubPlot = useCallback(async (): Promise<void> =>{
        try {
            setLoading(true);
            setError(null);
            const data = await SubPlotService.findAll();
            setSubPlot(data);
        } catch (error) {
            console.error(error);
            setError("Erreur lors du chargement des placettes");
        } finally {
            setLoading(false);
        }
    }, []);

    const refreshSubPlot = useCallback(async (): Promise<void> =>{
        await loadSubPlot();
    }, [loadSubPlot]);

    const validateData = (data: SubPlotDTO): string | null => {
        if (data.uuid_sub_plot === undefined || data.uuid_sub_plot === null) return "Le placette est requis."
        if (!data.name || data.name.trim().length === 0) return "Le nom est requis.";
        if (typeof data.width !== "number" || Number.isNaN(data.width) || data.width <= 0) return "La longueur doit être un nombre > 0.";
        if (typeof data.height !== "number" || Number.isNaN(data.height) || data.height <= 0) return "La largeur doit être un nombre > 0.";
        if (!data.location || data.location.trim().length === 0) return "Les coordonnées sont requises.";
        if (!isValidGeoJSON(data.location)) return "La location fourni n'est pas un valide.";
        if (data.uuid_plantation_block === undefined || data.uuid_plantation_block === null || typeof data.uuid_plantation_block !== "string") return "Le placeau est requis.";

        return null;
    }

    const insertSubPlot = useCallback(async (data: SubPlotDTO): Promise<SubmitResult> =>{
        setSubmitError(null);
        setSubmitSuccess(null);

        const validationError = validateData(data);
        if (validationError) {
            setSubmitError(validationError);
            return { success: false, error: validationError};
        }

        try {
            setSubmitting(true);
            const uuid = await SubPlotService.insertSubPlot(data);
            setSubmitSuccess(`Placette créée (uuid: ${uuid})`);
            try { await loadSubPlot(); } catch (e) { console.warn("useSubPlot - refresh ater create failed: ", e); }
            return { success: true, uuid };
        } catch (error : any){
            const message = error instanceof Error ? error.message : "Erreur lors de la création de la zone";
            console.error("useSubPlot - insertSubPlot unrecoverable error: ", error);
            setSubmitError(message);
            return { success: false, error: message };
        } finally {
            setSubmitting(false);
        }
    }, [loadSubPlot]);

    const updateSubPlot = useCallback(async (data: SubPlotDTO & { uuid_sub_plot: string }): Promise<SubmitResult> => {
        setSubmitError(null);
        setSubmitSuccess(null);
    
        const validationError = validateData(data);
        if (validationError) {
          setSubmitError(validationError);
          return { success: false, error: validationError };
        }
    
        try {
          setSubmitting(true);
          const uuid = await SubPlotService.updateSubPlot(data);
          setSubmitSuccess(`Placette mise à jour (uuid: ${uuid})`);
    
          // --- suppression locale de la placette mise à jour dans la liste "non mises à jour"
          setUnupdatedSubPlots(prev => prev.filter(p => p.uuid_sub_plot !== uuid));
    
          // refresh global (optionnel mais utile)
          try { await loadSubPlot(); } catch (e) { console.warn("useSubPlot - refresh after update failed: ", e); }
    
          return { success: true, uuid };
        } catch (error: any) {
          const message = error instanceof Error ? error.message : "Erreur lors de la mise à jour de la placette";
          console.error("useSubPlot - updateSubPlot unrecoverable error: ", error);
          setSubmitError(message);
          return { success: false, error: message };
        } finally {
          setSubmitting(false);
        }
      }, [loadSubPlot]);

    const loadUnupdatedByPlantationBlock = useCallback(async (uuid_plantation_block: string): Promise<void> => {
        if (!uuid_plantation_block) {
          setUnupdatedSubPlots([]);
          return;
        }
        try {
          setLoadingUnupdated(true);
          setError(null);
          const data = await SubPlotService.findUnupdatedByPlantationBlock(uuid_plantation_block);
          setUnupdatedSubPlots(data || []);
        } catch (err) {
          console.error("useSubPlot - loadUnupdatedByPlantationBlock error:", err);
          setError("Erreur lors du chargement des placettes non mises à jour");
          setUnupdatedSubPlots([]);
        } finally {
          setLoadingUnupdated(false);
        }
      }, []);

    const resetForm = useCallback(() => {
        setSubmitting(false);
        setSubmitError(null);
        setSubmitSuccess(null);
    }, []);

    return {
        subPlots,
        loading,
        error,
        refreshSubPlot,

        unupdatedSubPlots,
        loadingUnupdated,
        loadUnupdatedByPlantationBlock,

        submitting,
        submitError,
        submitSuccess,
        insertSubPlot,
        updateSubPlot,
        resetForm,
    };

    

};