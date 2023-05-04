import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Poster } from "../entities/poster.entity";
import { AppError } from "../errors/AppError";

const ensurePostOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const posterRepository: Repository<Poster> = AppDataSource.getRepository(Poster);
  const foundPoster: Poster = await posterRepository.findOne({
    where: {
      id: req.params.id,
    },
    relations: {
      user: true,
    },
  });

  if (foundPoster.user.id !== req.user.id) {
    throw new AppError("Must be owner to update the poster", 403);
  }

  return next();
};

export default ensurePostOwnerMiddleware;
