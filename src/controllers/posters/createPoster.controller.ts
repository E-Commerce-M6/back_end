import { Response, Request } from "express";
import { createPosterService } from "../../services/posters";
import { IPosterCreateSchema, IPosterReturnSchema } from "../../interfaces/posters.interfaces";

const createPosterController = async (req: Request, res: Response): Promise<Response> => {
  const posterData: IPosterCreateSchema = req.body;
  const imagesData: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] = req.files;
  const userId: string = req.user.id;
  const newPoster: IPosterReturnSchema = await createPosterService(posterData, userId, imagesData);
  return res.status(201).json(newPoster);
};

export default createPosterController;
