import { Request, Response } from "express";
import { listPosterService } from "../../services/posters";

const listPosterController = async (req: Request, res: Response): Promise<Response> => {
  const query = req.query;

  const posters = await listPosterService(query);

  return res.json(posters);
};

export default listPosterController;
