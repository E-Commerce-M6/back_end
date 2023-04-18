import { Repository } from "typeorm";
import { Poster } from "../../entities/poster.entity";
import AppDataSource from "../../data-source";
import { IPosterCreateSchema, IPosterReturnSchema } from "../../interfaces/posters.interfaces";
import { posterReturnSchema } from "../../schemas/posters.schemas";

const createPosterService = async (
  posterData: IPosterCreateSchema
): Promise<IPosterReturnSchema> => {
  const posterRepository: Repository<Poster> = AppDataSource.getRepository(Poster);
  const poster = posterRepository.create(posterData);
  await posterRepository.save(poster);

  const returnPoster = posterReturnSchema.parse(poster);

  return returnPoster;
};

export default createPosterService;
