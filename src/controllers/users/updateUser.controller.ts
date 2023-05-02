import { Request, Response } from "express";
import { IUserReturn, IUserUpdate } from "../../interfaces/users.interfaces";
import updateUserService from "../../services/users/updateUser.service";

const updateUserController = async (req: Request, res: Response): Promise<Response> => {
  const userId: string = req.params.id;
  const userData: IUserUpdate = req.body;
  const user: IUserReturn = await updateUserService(userId, userData);
  return res.status(200).json(user);
};

export default updateUserController;
