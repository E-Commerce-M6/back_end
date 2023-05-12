import { Repository } from "typeorm";
import { Poster } from "../../entities/poster.entity";
import AppDataSource from "../../data-source";
import { IPosterCreateSchema, IPosterReturnSchema } from "../../interfaces/posters.interfaces";
import { posterReturnSchema } from "../../schemas/posters.schemas";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const createPosterService = async (
  posterData: IPosterCreateSchema,
  userId: string,
  imagesData: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[]
): Promise<IPosterReturnSchema | any> => {
  // create images at cloudnary
  const imagesPublicIds = [];
  for (const index in imagesData) {
    const image = imagesData[index];

    const upload = await cloudinary.uploader.upload(image.path, (error, result) => result);
    imagesPublicIds.push({ public_id: upload.public_id, url: upload.secure_url });

    fs.unlink(image.path, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  // create poster
  const posterRepository: Repository<Poster> = AppDataSource.getRepository(Poster);
  const poster = posterRepository.create({
    user: {
      id: userId,
    },
    ...posterData,
    images: imagesPublicIds,
  });
  await posterRepository.save(poster);

  const returnPoster = posterReturnSchema.parse(poster);

  return returnPoster;
};

export default createPosterService;
