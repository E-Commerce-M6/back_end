import { Response, Request } from "express";
import { ICommentReturnSchema } from "../../interfaces/comments.interface";
import getCommentsByPostIdService from "../../services/comments/getCommentsByPosterId.service";

const getCommentsByPostIdController = async (req: Request, res: Response): Promise<Response> => {
  const postId: string = req.params.id;
  const comments: ICommentReturnSchema[] = await getCommentsByPostIdService(postId);
  return res.status(200).json(comments);
};

export default getCommentsByPostIdController;
