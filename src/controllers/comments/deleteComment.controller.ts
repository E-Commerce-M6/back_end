import { Request, Response } from "express";
import { deleteCommentService } from "../../services/comments";

const deleteCommentController = async (req: Request, res: Response): Promise<Response> => {
  const commentId: string = req.params.id;
  await deleteCommentService(commentId);

  return res.status(204).json();
};

export default deleteCommentController;
