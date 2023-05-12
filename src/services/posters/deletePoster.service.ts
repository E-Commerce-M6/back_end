import { Repository } from "typeorm";
import { Poster } from "../../entities/poster.entity";
import AppDataSource from "../../data-source";
import { v2 as cloudinary } from 'cloudinary';

const deletePosterService = async (posterId: string): Promise<void> => {
  const posterRepository: Repository<Poster> = AppDataSource.getRepository(Poster);
  const poster = await posterRepository.findOne({
    where: {
      id: posterId,
    }, 
    relations: {
      images: true
    }
  })

  poster.images.forEach((image) => {
    cloudinary.uploader.destroy(image.public_id)
  })

  await posterRepository.delete({
    id: posterId,
  });
};

export default deletePosterService;
