import { ICommentUpdateSchema, ICommentReturnSchema } from "../../interfaces/comments.interface";
import { Response, Request } from "express";
import updateCommentService from "../../services/comments/updateComment.service";

const updateCommentController = async (req: Request, res: Response): Promise<Response> => {
  const commentData: ICommentUpdateSchema = req.body;
  const commentId: string = req.params.id;
  const updatedComment: ICommentReturnSchema = await updateCommentService(commentData, commentId);
  return res.status(200).json(updatedComment);
};

export default updateCommentController;
