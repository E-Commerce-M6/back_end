import { Request, Response } from "express";
import { getPosterByIdService } from "../../services/posters";

const getPosterByIdController = async (req: Request, res: Response): Promise<Response> => {
  const posterId: string = req.params.id;

  const poster = await getPosterByIdService(posterId);

  return res.json(poster);
};

export default getPosterByIdController;
