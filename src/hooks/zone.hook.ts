// src/hooks/zone.hook.ts
import { useEffect, useState, useCallback } from "react";
import { Zone } from "../types/entities/zone.entity";
import { ZoneDTO } from "../types/dto/zoneDTO.dto";
import { isValidGeoJSON } from "../utils/geom";
import { ZoneService } from "../services/zone.service";

export const useZones = () => {
    const [zones, setZones] = useState<Zone[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // submission state
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    type SubmitResult = { success: true; uuid: string } | { success: false; error: string };

    const loadZones = useCallback(async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const data = await ZoneService.findAllZone();
            setZones(data);
        } catch (err) {
            console.error(err);
            setError("Erreur lors du chargement des zones");
        } finally {
            setLoading(false);
        }
    }, []);
    
    const refreshZones = useCallback(async (): Promise<void> => {
      await loadZones();
    }, [loadZones]);

    const validatePayload = (payload: {
        name: string;
        area: number;
        coords?: { latitude: number; longitude: number }[];
        geom?: string;
        id_type_zone: number;
      }): string | null => {
        if (!payload.name || payload.name.trim().length === 0) return "Le nom est requis.";
        if (typeof payload.area !== "number" || Number.isNaN(payload.area) || payload.area <= 0) return "La superficie doit être un nombre > 0.";
        if (payload.id_type_zone === undefined || payload.id_type_zone === null) return "Le type de zone est requis.";
    
        // maintenant on exige geom (GeoJSON string)
      if (!payload.geom || payload.geom.trim().length === 0) return "Les coordonnées (geom) sont requises.";
      if (!isValidGeoJSON(payload.geom)) return "Le geom fourni n'est pas un GeoJSON valide.";
    
        return null;
      };

    // submitForm: accepte désormais ZoneDTO-like (avec geom)
    const submitForm = useCallback(async (payload: ZoneDTO): Promise<SubmitResult> => {
      // reset
      setSubmitError(null);
      setSubmitSuccess(null);

      const validationError = validatePayload(payload);
      if (validationError) {
        setSubmitError(validationError);
        return { success: false, error: validationError };
      }

      try {
        setSubmitting(true);
        // ZoneService.createZone attend ZoneDTO {name, area, geom, id_type_zone}
        const uuid = await ZoneService.createZone(payload as any); // ZoneDTO
        setSubmitSuccess(`Zone créée (uuid: ${uuid})`);
        try { await loadZones(); } catch (e) { console.warn("useZones - refresh after create failed:", e); }
        return { success: true, uuid };
      } catch (err: any) {
        const message = err instanceof Error ? err.message : "Erreur lors de la création de la zone";
        console.error("useZones - submitForm unrecoverable error:", err);
        setSubmitError(message);
        return { success: false, error: message };
      } finally {
        setSubmitting(false);
      }
    }, [loadZones]);
    
    const zoneResetForm = useCallback(() => {
        setSubmitting(false);
        setSubmitError(null);
        setSubmitSuccess(null);
    }, []);

    return {
        // list
        zones,
        loading,
        error,
        refresh: refreshZones,
    
        // create
        submitting,
        submitError,
        submitSuccess,
        submitForm,
        zoneResetForm,
      };
    
};
