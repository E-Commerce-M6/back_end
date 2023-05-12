import { Request, Response } from "express";
import { updatePosterService } from "../../services/posters";
import { IPosterReturnSchema, IPosterUpdateSchema } from "../../interfaces/posters.interfaces";

const updatePosterController = async (req: Request, res: Response): Promise<Response> => {
  const posterId: string = req.params.id;
  const posterData: IPosterUpdateSchema = req.body;
  const imagesData: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] = req.files;
  const poster: IPosterReturnSchema = await updatePosterService(posterData, posterId, imagesData);
  return res.status(200).json(poster);
};

export default updatePosterController;
