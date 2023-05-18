import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import AppDataSource from "../data-source";
import { AppError } from "../errors/AppError";

const ensureEmailOrCpfNotUsedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email: userEmail, cpf: userCpf } = req.body;
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  let foundUser;

  if (req.user) {
    foundUser = await userRepository
      .createQueryBuilder("user")
      .where("user.id != :id AND (user.email = :email OR user.cpf = :cpf)", {
        id: req.user.id,
        email: userEmail,
        cpf: userCpf,
      })
      .getOne();
  } else {
    foundUser = await userRepository
      .createQueryBuilder("user")
      .where("user.email = :email OR user.cpf = :cpf", {
        email: userEmail,
        cpf: userCpf,
      })
      .getOne();
  }

  if (foundUser) {
    throw new AppError("Email or CPF already used", 409);
  }

  return next();
};

export default ensureEmailOrCpfNotUsedMiddleware;
