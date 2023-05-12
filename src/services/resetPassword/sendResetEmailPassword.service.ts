import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { v4 as uuidv4 } from "uuid";
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

  const resetToken = uuidv4();
  const resetDate = new Date().toLocaleDateString("en-US");

  const updatedUser = userRepository.create({
    ...user,
    reset_token: resetToken,
    reset_token_date: resetDate,
  });
  await userRepository.save(updatedUser);

  const emailTemplateReset = resetPasswordTemplate(email, user.name, protocol, host, resetToken);

  await sendEmail(emailTemplateReset);
};

export default sendResetEmailPasswordService;
