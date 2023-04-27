import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { hashSync } from "bcryptjs";

const resetPasswordService = async (password: string, resetToken: string) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  try {
    const user = await userRepository.findOneBy({ reset_token: resetToken });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const updatedUser = userRepository.create({
      ...user,
      password: hashSync(password, 10),
      reset_token: null,
    });
    await userRepository.save(updatedUser);
  } catch (error) {
    throw new AppError("Invalid token", 400);
  }
};

export default resetPasswordService;
