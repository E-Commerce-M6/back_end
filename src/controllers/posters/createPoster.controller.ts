import { Response, Request } from "express";
import { createPosterService } from "../../services/posters";
import { IPosterCreateSchema } from "../../interfaces/posters.interfaces";

const createPosterController = async (req: Request, res: Response): Promise<Response> => {
  const posterData: IPosterCreateSchema = req.body;
  const newPoster = await createPosterService(posterData);
  return res.status(201).json(newPoster);
};

export default createPosterController;
