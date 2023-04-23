import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/user.entity";

const ensureUserExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({
    id: id,
  });

  if (!user) {
    throw new AppError("Not found", 404);
  }

  return next();
};

export default ensureUserExistsMiddleware;
