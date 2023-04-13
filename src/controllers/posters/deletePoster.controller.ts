import { Request, Response } from "express";
import { deletePosterService } from "../../services/posters";

const deletePosterController = async (req: Request, res: Response): Promise<Response> => {
  const posterId: string = req.params.id;
  await deletePosterService(posterId);
  return res.status(204);
};

export default deletePosterController;
