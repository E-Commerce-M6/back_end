import { Request, Response } from "express";
import { getUserByTokenService } from "../../services/users";

const getUserByTokenController = async (req: Request, res: Response) => {
  const userData = req.user;
  const user = await getUserByTokenService(userData);

  return res.status(200).json(user);
};

export default getUserByTokenController;
