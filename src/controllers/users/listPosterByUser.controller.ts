import { Request, Response } from "express";
import { listPosterByUserService } from "../../services/users";

const listPosterByUserController = async (req: Request, res: Response) => {
  const query = req.query;
  const { id } = req.params;
  const posterList = await listPosterByUserService(id, query);

  return res.status(200).json(posterList);
};

export default listPosterByUserController;
