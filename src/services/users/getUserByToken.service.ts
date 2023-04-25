import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserReturn } from "../../interfaces/users.interfaces";
import { userReturnSchema } from "../../schemas/users.schemas";

const getUserByTokenService = async (userData: {
  id: string;
  isSeller: boolean;
}): Promise<IUserReturn> => {
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({
    where: {
      id: userData.id,
    },
    relations: {
      address: true,
    },
  });

  return userReturnSchema.parse(user);
};

export default getUserByTokenService;
