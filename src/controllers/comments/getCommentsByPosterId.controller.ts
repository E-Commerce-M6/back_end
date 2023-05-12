import { Response, Request } from "express";
import { ICommentReturnSchema } from "../../interfaces/comments.interface";
import { getCommentsByPostIdService } from "../../services/comments";

const getCommentsByPostIdController = async (req: Request, res: Response): Promise<Response> => {
  const posterId: string = req.params.id;
  const comments: ICommentReturnSchema[] = await getCommentsByPostIdService(posterId);
  return res.status(200).json(comments);
};

export default getCommentsByPostIdController;
