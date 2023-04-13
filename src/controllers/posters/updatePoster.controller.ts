import { Request, Response } from "express";
import { updatePosterService } from "../../services/posters";
import { IPosterUpdateSchema } from "../../interfaces/posters.interfaces";

const updatePosterController = async (req: Request, res: Response): Promise<Response> => {
  const posterId: string = req.params.id;
  const posterData: IPosterUpdateSchema = req.body;
  const poster = await updatePosterService(posterData, posterId);
  return res.status(200).json(poster);
};

export default updatePosterController;
