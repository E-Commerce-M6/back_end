import { Request, Response } from "express";
import { resetPasswordService } from "../../services/resetPassword";

const resetPasswordController = async (req: Request, res: Response): Promise<Response> => {
  const { password } = req.body;

  await resetPasswordService(password, req.user.id);

  return res.json({ message: "Password updated with success" });
};

export default resetPasswordController;
