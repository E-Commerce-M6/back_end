import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import { Poster } from "../../entities/poster.entity";
import { AppError } from "../../errors/AppError";

const getPosterByIdService = async (id: string): Promise<Poster> => {
  const posterRepository: Repository<Poster> = AppDataSource.getRepository(Poster);

  try {
    const poster = await posterRepository.findOne({
      where: { id: id },
      relations: { images: true },
    });

    if (!poster) {
      throw new AppError("Poster not found!", 404);
    }

    return poster;
  } catch (error) {
    throw new AppError("Invalid id!", 400);
  }
};

export default getPosterByIdService;
