import { createTransport } from "nodemailer";
import { ISendEmail } from "../interfaces/sendEmail.interfaces";
import { AppError } from "../errors/AppError";
import Mailgen from "mailgen";
import "dotenv/config";

const sendEmail = async ({ to, subject, text }: ISendEmail) => {
  const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter
    .sendMail({
      from: process.env.SENDER_EMAIL,
      to,
      subject,
      html: text,
    })
    .then(() => {
      console.log("email send with success");
    })
    .catch((err) => {
      console.error(err);
      throw new AppError("Error sending email, try again later", 500);
    });
};

const resetPasswordTemplate = (
  userEmail: string,
  userName: string,
  protocol: string,
  host: string,
  resetToken: string
) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      // Appears in header & footer of e-mails
      name: "Motors Shop",
      link: `${protocol}://${host}`,
      // Optional logo
      // logo: 'https://mailgen.js/img/logo.png'
      copyright: "Copyright © 2023 Motors Shop. Todos os direitos reservados.",
    },
  });

  const resetPasswordPage =
    process.env.NODE_ENV == "prod" ? process.env.BASEURL_PROD : "http://localhost:3000";

  console.log(resetPasswordPage);

  const email = {
    body: {
      greeting: "Olá",
      signature: "Até mais",
      name: userName,
      intro:
        "Você recebeu este e-mail porque uma solicitação de redefinição de senha para sua conta foi recebida.",
      action: {
        instructions: "Clique no botão abaixo para redefinir sua senha:",
        button: {
          color: "#DC4D2F",
          text: "Redefina sua senha",
          link: `${resetPasswordPage}/resetPassword/${resetToken}`,
        },
      },
      outro:
        "Se você não solicitou uma redefinição de senha, nenhuma outra ação será necessária de sua parte.",
    },
  };

  const emailBody = mailGenerator.generate(email);

  const emailTemplate = {
    to: userEmail,
    subject: "Reset password",
    text: emailBody,
  };

  return emailTemplate;
};

export { sendEmail, resetPasswordTemplate };
