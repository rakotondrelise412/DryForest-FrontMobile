// src/utils/geom.ts

type Coord = { latitude: number; longitude: number };

/**
 * Convertit un tableau de coordonnées {latitude,longitude} en GeoJSON string.
 * - 1 point -> Point
 * - 2 points -> LineString
 * - >=3 points -> Polygon (ferme automatiquement la boucle si nécessaire)
 */
export const coordsToGeoJSON = (coords: Coord[]): string => {
  if (!coords || coords.length === 0) return "";

  if (coords.length === 1) {
    const [c] = coords;
    const geom = { type: "Point", coordinates: [c.longitude, c.latitude] };
    return JSON.stringify(geom);
  }

  if (coords.length === 2) {
    const lineCoords = coords.map(c => [c.longitude, c.latitude]);
    const geom = { type: "LineString", coordinates: lineCoords };
    return JSON.stringify(geom);
  }

  // >= 3 => polygon
  const polyCoords = coords.map(c => [c.longitude, c.latitude]);
  // fermer la boucle si nécessaire
  const first = polyCoords[0];
  const last = polyCoords[polyCoords.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) {
    polyCoords.push([...first]);
  }
  const geom = { type: "Polygon", coordinates: [polyCoords] };
  return JSON.stringify(geom);
};

/**
 * Validation basique d'un GeoJSON string.
 * Retourne true si JSON valide et contient un "type" et "coordinates" non vide.
 * (Ne remplace pas une validation complète GeoJSON mais suffit pour la plupart des checks locaux.)
 */
export const isValidGeoJSON = (geomStr: string): boolean => {
  if (!geomStr || typeof geomStr !== "string") return false;
  try {
    const obj = JSON.parse(geomStr);
    if (!obj || typeof obj !== "object") return false;
    if (!obj.type) return false;
    if (!("coordinates" in obj)) return false;
    // coordinates au moins non vide
    if (!obj.coordinates) return false;
    if (Array.isArray(obj.coordinates) && obj.coordinates.length === 0) return false;
    return true;
  } catch {
    return false;
  }
};
