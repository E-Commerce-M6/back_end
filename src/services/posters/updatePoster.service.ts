import { Repository } from "typeorm";
import { Poster } from "../../entities/poster.entity";
import AppDataSource from "../../data-source";
import { IPosterUpdateSchema, IPosterReturnSchema } from "../../interfaces/posters.interfaces";
import { posterReturnSchema } from "../../schemas/posters.schemas";
import { ImagePoster } from "../../entities/imagePoster";

const updatePosterService = async (
  posterUpdateData: IPosterUpdateSchema,
  posterId: string
): Promise<IPosterReturnSchema> => {
  const posterRepository: Repository<Poster> = AppDataSource.getRepository(Poster);
  const imageRepository: Repository<ImagePoster> = AppDataSource.getRepository(ImagePoster);

  if (posterUpdateData.images) {
    await imageRepository.delete({
      poster: {
        id: posterId,
      },
    });
  }

  const posterData = await posterRepository.findOne({
    where: {
      id: posterId,
    },
    relations: {
      images: true,
    },
  });

  const poster = posterRepository.create({
    ...posterData,
    ...posterUpdateData,
  });

  await posterRepository.save(poster);

  const returnPoster = posterReturnSchema.parse(poster);

  return returnPoster;
};

export default updatePosterService;
