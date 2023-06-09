import { Request, Response } from "express";
import { createUserService } from "../../services/users";

const createUserController = async (req: Request, res: Response) => {
  const userData = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};

export default createUserController;
