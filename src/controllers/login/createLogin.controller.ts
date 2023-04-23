import { createLoginService } from "../../services/login";
import { Request, Response } from "express";
import { ILoginReturn, ILoginSchema } from "../../interfaces/login.interfaces";

const createLoginController = async (req: Request, res: Response): Promise<Response> => {
  const loginData: ILoginSchema = req.body;
  const tokenUser: ILoginReturn = await createLoginService(loginData);
  return res.status(200).json(tokenUser);
};

export default createLoginController;
