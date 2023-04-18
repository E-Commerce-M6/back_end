import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import AppDataSource from "../data-source";
import { AppError } from "../errors/AppError";

const ensureEmailNotUsedMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userEmail: string = req.body.email;
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const foundUser = await userRepository.findOneBy({
    email: userEmail,
  });

  if (foundUser) {
    throw new AppError("Email already used", 409);
  }

  return next();
};

export default ensureEmailNotUsedMiddleware;
