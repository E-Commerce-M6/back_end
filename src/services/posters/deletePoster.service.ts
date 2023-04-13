import { Repository } from "typeorm";
import { Poster } from "../../entities/poster.entity";
import AppDataSource from "../../data-source";

const deletePosterService = async (posterId: string): Promise<void> => {
  const posterRepository: Repository<Poster> = AppDataSource.getRepository(Poster);

  await posterRepository.delete({
    id: posterId,
  });
};

export default deletePosterService;
