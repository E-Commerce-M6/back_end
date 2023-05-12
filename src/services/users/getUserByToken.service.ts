import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserReturn } from "../../interfaces/users.interfaces";
import { userReturnSchema } from "../../schemas/users.schemas";

const getUserByTokenService = async (id: string): Promise<IUserReturn> => {
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({
    where: {
      id: id,
    },
    relations: {
      address: true,
    },
  });

  return userReturnSchema.parse(user);
};

export default getUserByTokenService;
