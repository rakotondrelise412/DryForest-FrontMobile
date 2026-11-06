// src/hooks/reforestation.hook.ts
import { ReforestationDTO } from "@/src/types/dto/reforestation.dto"; // crée si nécessaire
import { useCallback, useState } from "react";
import { ReforestationService } from "../services/reforestation.service";
import { ReforestationDetailDTO } from "../types/dto/reforestationDetail.dto";

export const useReforestation = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  type SubmitResult =
    | { success: true; uuid: string }
    | { success: false; error: string };

  const validate = (
    data: ReforestationDTO,
    details: ReforestationDetailDTO[],
  ): string | null => {
    if (
      !data.uuid_zone ||
      typeof data.uuid_zone !== "string" ||
      data.uuid_zone.trim() === ""
    )
      return "La zone est requise.";
    if (
      !(data.date_reforestation instanceof Date) ||
      Number.isNaN(data.date_reforestation.getTime())
    )
      return "La date est invalide.";
    if (
      typeof data.quantity !== "number" ||
      Number.isNaN(data.quantity) ||
      data.quantity <= 0
    )
      return "La quantité totale doit être un nombre > 0.";
    if (!Array.isArray(details) || details.length === 0)
      return "Au moins une espèce doit être renseignée.";
    let qtTotal_detail = 0;
    for (const d of details) {
      if (
        typeof d.id_species !== "number" ||
        Number.isNaN(d.id_species) ||
        d.id_species <= 0
      )
        return "Chaque ligne doit avoir un id_species valide.";
      if (
        typeof d.quantity !== "number" ||
        Number.isNaN(d.quantity) ||
        d.quantity <= 0
      )
        return "Chaque ligne doit avoir une quantité > 0.";
      qtTotal_detail = qtTotal_detail + d.quantity;
    }

    if (data.quantity !== qtTotal_detail)
      return "Votre nombre de plante à planter sont fause, verifie le.";
    return null;
  };

  const insertReforestation = useCallback(
    async (
      data: ReforestationDTO,
      details: ReforestationDetailDTO[],
    ): Promise<SubmitResult> => {
      setSubmitError(null);
      setSubmitSuccess(null);

      const validationError = validate(data, details);
      if (validationError) {
        setSubmitError(validationError);
        return { success: false, error: validationError };
      }

      try {
        setSubmitting(true);
        const uuid = await ReforestationService.insertReforestation(
          data,
          details,
        );
        setSubmitSuccess(`Reforestation créée (uuid: ${uuid})`);
        return { success: true, uuid };
      } catch (err: any) {
        const message =
          err instanceof Error
            ? err.message
            : "Erreur lors de la création de la reforestation";
        console.error(
          "useReforestation - insertReforestation unrecoverable error:",
          err,
        );
        setSubmitError(message);
        return { success: false, error: message };
      } finally {
        setSubmitting(false);
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(null);
  }, []);

  return {
    submitting,
    submitError,
    submitSuccess,
    insertReforestation,
    reset,
  };
};
