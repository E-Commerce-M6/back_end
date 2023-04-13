import { Repository } from "typeorm";
import { Poster } from "../../entities/poster.entity";
import AppDataSource from "../../data-source";
import { IPosterCreateSchema, IPosterReturnSchema } from "../../interfaces/posters.interfaces";
import { posterReturnSchema } from "../../schemas/posters.schemas";
import { ImagePoster } from "../../entities/imagePoster";

const createPosterService = async (
  posterData: IPosterCreateSchema
): Promise<IPosterReturnSchema> => {
  const posterRepository: Repository<Poster> = AppDataSource.getRepository(Poster);
  const imageRepository: Repository<ImagePoster> = AppDataSource.getRepository(ImagePoster);
  const { images, ...data } = posterData;

  const poster = posterRepository.create(data);
  await posterRepository.save(poster);

  const imagesPoster = images.map(({ url }) => {
    return {
      url,
      poster: poster,
    };
  });

  await imageRepository.insert(imagesPoster);

  const findPoster = await posterRepository.findOne({
    where: {
      id: poster.id,
    },
    relations: {
      images: true,
    },
  });

  const returnPoster = posterReturnSchema.parse(findPoster);

  return returnPoster;
};

export default createPosterService;
