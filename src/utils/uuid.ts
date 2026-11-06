// src/utils/uuid.ts
import { openDB } from "../db";

/**
 * Génère un UUID v4 (basé sur Math.random — suffisant pour usage local/dev).
 */
export const uuidv4 = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Génère un UUID unique pour une table/colonne donnée.
 * Boucle tant que l'UUID existe déjà dans la table.
 */
export const generateUniqueUuidForTable = async (
  table = "zone",
  column = "uuid_zone"
): Promise<string> => {
  const db = await openDB();

  // loop jusqu'à ce qu'on ait un uuid qui n'existe pas encore
  for (let i = 0; i < 50; i++) { // safety limit
    const candidate = uuidv4();
    try {
      // j'utilise getFirstAsync qui renvoie undefined si pas trouvé
      const exists = await db.getFirstAsync<any>(
        `SELECT 1 AS found FROM ${table} WHERE ${column} = ? LIMIT 1`,
        [candidate]
      );
      if (!exists) return candidate;
      // sinon collision — continue
    } catch (err) {
      // si erreur (par ex. colonne/table inexistante), on ignore et retourne candidate
      // (mais idéalement la table existe)
      console.warn("generateUniqueUuidForTable - check error:", err);
      return candidate;
    }
  }

  // Si on arrive ici (très improbable), génère un UUID et le retourne quand même
  console.warn("generateUniqueUuidForTable: many collisions, returning new uuid anyway");
  return uuidv4();
};
