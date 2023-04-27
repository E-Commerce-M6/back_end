import { Request, Response } from "express";
import { getPosterFiltersService } from "../../services/posters";

const getPosterFiltersController = async (req: Request, res: Response) => {
  const query = req.query;
  const filter = await getPosterFiltersService(query);
  return res.status(200).json(filter);
};

export default getPosterFiltersController;
