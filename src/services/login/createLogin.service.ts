import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { ILoginReturn, ILoginSchema } from "../../interfaces/login.interfaces";

const createLoginService = async ({ email, password }: ILoginSchema): Promise<ILoginReturn> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUsers = await userRepository.findOneBy({ email: email });

  if (!findUsers) {
    throw new AppError("Password or email incorrect", 401);
  }

  const checkPassword = await compare(password, findUsers.password);

  if (!checkPassword) {
    throw new AppError("Password or email incorrect", 401);
  }

  const tokenUser = jwt.sign(
    {
      isSeller: findUsers.is_seller,
    },
    process.env.SECRET_KEY!,
    {
      subject: findUsers.id,
      expiresIn: "24h",
    }
  );

  return { token: tokenUser };
};

export default createLoginService;
