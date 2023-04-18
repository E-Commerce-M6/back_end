import { NextFunction, Response, Request } from "express";
import { Repository } from "typeorm";
import { Poster } from "../entities/poster.entity";
import AppDataSource from "../data-source";
import { AppError } from "../errors/AppError";

const ensurePosterExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const posterId: string = req.params.id;
  const posterRepository: Repository<Poster> = AppDataSource.getRepository(Poster);

  const foundPoster = await posterRepository.findOneBy({
    id: posterId,
  });

  if (!foundPoster) {
    throw new AppError("Poster not found", 404);
  }

  return next();
};

export default ensurePosterExistsMiddleware;
