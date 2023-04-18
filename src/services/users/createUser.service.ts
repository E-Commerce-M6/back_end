import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserCreate, IUserReturn } from "../../interfaces/users.interfaces";
import { userReturnSchema } from "../../schemas/users.schemas";

const createUserService = async (userData: IUserCreate): Promise<IUserReturn> => {
  const userRepository = AppDataSource.getRepository(User);

  const newUser = userRepository.create(userData);

  await userRepository.save(newUser);

  const returnUser = userReturnSchema.parse(newUser);

  return returnUser;
};

export default createUserService;
