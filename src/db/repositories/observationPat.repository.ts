import { ObservationPat } from "@/src/types/entities/ObservationPatrol.entity";
import { openDB } from "..";

export const ObservationPatRepository = {
  async findAll(): Promise<ObservationPat[]> {
    try {
      const db = await openDB();
      const observation_patrols = db.getAllAsync<ObservationPat>(
        `SELECT (uuid_observation_pat, datetime_observation, location, description, id_observation_patrol_type, id_patrol_group, id_user, uuid_zone) FROM observation_pat`,
      );
      return observation_patrols || [];
    } catch (error) {
      console.error("ObservationPatRepository.findAll : ", error);
      return [];
    }
  },

  async insertObservationPat(data: ObservationPat): Promise<string> {
    try {
      const db = await openDB();
      const uuid = String(data.uuid_observation_pat);
      const datetime_observation = data.datetime_observation.toISOString();
      const location = data.location ?? "";
      const description = data.description ?? "";
      const id_observation_patrol_type = Number(
        data.id_observation_patrol_type ?? 0,
      );
      const id_patrol_group = Number(data.id_patrol_group ?? 0);
      const id_user = Number(data.id_user ?? 0);
      const uuid_zone = String(data.uuid_zone ?? "");

      await db.runAsync(
        `INSERT INTO observation_pat
                (uuid_observation_pat, datetime_observation, location, description, created_at, updated_at, is_synced, id_observation_patrol_type, id_patrol_group, id_user, uuid_zone)
                VALUES (?,?,?,?, date('now'), NULL, 0, ?,?,?,?)`,
        [
          uuid,
          datetime_observation,
          location,
          description,
          id_observation_patrol_type,
          id_patrol_group,
          id_user,
          uuid_zone,
        ],
      );

      return uuid;
    } catch (error) {
      console.error("ObservationPatRepository.insertObservationPat : ", error);
      throw error;
    }
  },
};
