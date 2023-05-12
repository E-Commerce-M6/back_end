import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";
import { sendEmail, resetPasswordTemplate } from "../../utils/sendEmail.utils";

const sendResetEmailPasswordService = async (email: string, protocol: string, host: string) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  const resetToken = jwt.sign(
    {
      isSeller: user.is_seller,
    },
    process.env.SECRET_KEY!,
    {
      subject: user.id,
      expiresIn: "1h",
    }
  );

  const emailTemplateReset = resetPasswordTemplate(email, user.name, protocol, host, resetToken);

  await sendEmail(emailTemplateReset);
};

export default sendResetEmailPasswordService;
