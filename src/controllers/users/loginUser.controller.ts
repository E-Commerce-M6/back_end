import { loginUserService } from "../../services/users/loginUser.service";
import { Request, Response } from "express";

const loginUserController = async (req: Request, res: Response) => {
    const loginData = req.body;
    const tokenUser = await loginUserService(loginData);
    return res.status(200).json({ tokenUser });
};

export default loginUserController