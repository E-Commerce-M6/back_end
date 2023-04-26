import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import { userReturnSchema } from "../../schemas/users.schemas";
import { IUserReturn, IUserUpdate } from "../../interfaces/users.interfaces";

const updateUserService = async (
  userId: string,
  { address: newAddress, ...newData }: IUserUpdate
): Promise<IUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const { address: actAddress, ...actData }: User = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      address: true,
    },
  });

  const updatedUser = userRepository.create({
    ...actData,
    ...newData,
    address: {
      ...actAddress,
      ...newAddress,
    },
  });

  await userRepository.save(updatedUser);

  const returnUser = userReturnSchema.parse(updatedUser);

  return returnUser;
};

export default updateUserService;
