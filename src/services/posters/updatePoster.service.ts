import { Repository } from "typeorm";
import { Poster } from "../../entities/poster.entity";
import AppDataSource from "../../data-source";
import { IPosterUpdateSchema, IPosterReturnSchema } from "../../interfaces/posters.interfaces";
import { posterReturnSchema } from "../../schemas/posters.schemas";
import { ImagePoster } from "../../entities/imagePoster";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const updatePosterService = async (
  posterUpdateData: IPosterUpdateSchema,
  posterId: string,
  imagesData: { [fieldname: string]: Express.Multer.File[] } | Express.Multer.File[]
): Promise<IPosterReturnSchema> => {
  const posterRepository: Repository<Poster> = AppDataSource.getRepository(Poster);
  const imageRepository: Repository<ImagePoster> = AppDataSource.getRepository(ImagePoster);

  const foundPoster = await posterRepository.findOne({
    where: {
      id: posterId,
    },
    relations: {
      images: true,
    },
  });

  let poster;

  if (imagesData.length) {
    // delete images
    foundPoster.images.forEach((image) => {
      cloudinary.uploader.destroy(image.public_id);
    });

    await imageRepository.delete({
      poster: {
        id: posterId,
      },
    });

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

    poster = posterRepository.create({
      ...foundPoster,
      ...posterUpdateData,
      images: imagesPublicIds,
    });
  } else {
    poster = posterRepository.create({
      ...foundPoster,
      ...posterUpdateData,
    });
  }

  await posterRepository.save(poster);

  const returnPoster = posterReturnSchema.parse(poster);

  return returnPoster;
};

export default updatePosterService;
