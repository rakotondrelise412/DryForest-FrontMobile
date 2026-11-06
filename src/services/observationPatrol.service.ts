import { v4 as uuidv4 } from "uuid";
import { ObservationPatRepository } from "../db/repositories/observationPat.repository";
import { ObservationPatrolDTO } from "../types/dto/observationPatrol.dto";
import { ObservationPat } from "../types/entities/ObservationPatrol.entity";
import { UserService } from "./user.service";

export const ObservationPatService = {
  async insertObservationPat(data: ObservationPatrolDTO): Promise<string> {
    const uuid = uuidv4();
    const user = await UserService.findById(1);
    const id_user = user?.id_user;

    const incidentPatrol: ObservationPat = {
      uuid_observation_pat: uuid,
      location: String(data.location),
      datetime_observation: data.datetime_observation,
      description: String(data.description),
      id_observation_patrol_type: Number(
        (data as any).id_observation_patrol_type,
      ),
      id_patrol_group: Number((data as any).id_patrol_group),
      id_user: Number(id_user),
      // id_user: Number((data as any).id_user),
      uuid_zone: (data as any).uuid_zone,
    };

    await ObservationPatRepository.insertObservationPat(incidentPatrol);

    return uuid;
  },
};
