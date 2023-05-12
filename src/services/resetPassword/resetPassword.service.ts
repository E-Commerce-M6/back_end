import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { hashSync } from "bcryptjs";

const resetPasswordService = async (password: string, resetToken: string) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ reset_token: resetToken });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const resetDate = user.reset_token_date
    .toString()
    .replace(/-/g, "/")
    .split("/")
    .reverse()
    .join("/");
  const dateNow = new Date().toLocaleDateString("pt-BR");

  if (resetDate !== dateNow) {
    throw new AppError(
      "Data do token expirada, por favor solicite o envio ao email novamente",
      401
    );
  }

  const updatedUser = userRepository.create({
    ...user,
    password: hashSync(password, 10),
    reset_token: null,
    reset_token_date: null,
  });
  await userRepository.save(updatedUser);
};

export default resetPasswordService;
