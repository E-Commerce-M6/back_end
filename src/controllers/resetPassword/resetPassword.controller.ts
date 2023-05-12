import { Request, Response } from "express";
import { resetPasswordService } from "../../services/resetPassword";

const resetPasswordController = async (req: Request, res: Response): Promise<Response> => {
  const { password } = req.body;
  const { resetToken } = req.params;

  await resetPasswordService(password, resetToken);

  return res.json({ message: "Password change with success" });
};

export default resetPasswordController;
