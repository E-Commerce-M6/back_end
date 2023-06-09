import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import { Poster } from "../../entities/poster.entity";
import { AppError } from "../../errors/AppError";
import { posterWithUserReturnSchema } from "../../schemas/posters.schemas";
import { IPosterReturnWithUserSchema } from "../../interfaces/posters.interfaces";

const getPosterByIdService = async (id: string): Promise<IPosterReturnWithUserSchema> => {
  const posterRepository: Repository<Poster> = AppDataSource.getRepository(Poster);

  const poster = await posterRepository.findOne({
    where: { id: id },
    relations: { images: true, user: true },
    order: {
      images: {
        id: "ASC",
      },
    },
  });

  if (!poster) {
    throw new AppError("Poster not found!", 404);
  }

  return posterWithUserReturnSchema.parse(poster);
};

export default getPosterByIdService;
