// Constantes
const CARBON_RATIO = 0.47;

/**
 * Calcule la biomasse sèche (dry AGB) d'un arbre
 * @returns La biomasse sèche en kg
 * @throws Error si les valeurs ne sont pas positives
 */
export function calculateDryAGB(diameterCm: number, heightM: number, woodDensityGcm3: number): number {

    if (diameterCm <= 0 || heightM <= 0 || woodDensityGcm3 <= 0) {
        throw new Error("Les valeurs doivent être positives.");
    }
    
    return 0.0673 * Math.pow(woodDensityGcm3 * diameterCm * diameterCm * heightM, 0.976);
}

/**
 * Calcule le carbone séquestré pour un arbre
 * @param dryAGB Biomasse sèche en kg
 * @returns Le carbone séquestré en kg
 */
export function calculateCarbon(dryAGB: number): number {
    return CARBON_RATIO * dryAGB;
}