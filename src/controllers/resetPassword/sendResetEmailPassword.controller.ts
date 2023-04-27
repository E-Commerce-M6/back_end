import { Request, Response } from "express";
import { sendResetEmailPasswordService } from "../../services/resetPassword";

const sendResetEmailPasswordController = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body;
  const { protocol } = req;
  const host = req.get("host");

  await sendResetEmailPasswordService(email, protocol, host!);

  return res.json({ message: "token send!" });
};

export default sendResetEmailPasswordController;
