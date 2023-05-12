import { ICommentCreateSchema, ICommentReturnSchema } from "../../interfaces/comments.interface";
import { Response, Request } from "express";
import { createCommentService } from "../../services/comments";

const createCommentController = async (req: Request, res: Response): Promise<Response> => {
  const commentData: ICommentCreateSchema = req.body;
  const userId: string = req.user.id;
  const posterId: string = req.params.id;
  const newComment: ICommentReturnSchema = await createCommentService(
    commentData,
    userId,
    posterId
  );
  return res.status(201).json(newComment);
};

export default createCommentController;
