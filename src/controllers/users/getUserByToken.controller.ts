import { Request, Response } from "express";
import { getUserByTokenService } from "../../services/users";

const getUserByTokenController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const user = await getUserByTokenService(userId);

  return res.status(200).json(user);
};

export default getUserByTokenController;
