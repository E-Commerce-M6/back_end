import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { hashSync } from "bcryptjs";

const resetPasswordService = async (password: string, userId: string) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const updatedUser = userRepository.create({
    ...user,
    password: hashSync(password, 10),
  });
  await userRepository.save(updatedUser);
};

export default resetPasswordService;
