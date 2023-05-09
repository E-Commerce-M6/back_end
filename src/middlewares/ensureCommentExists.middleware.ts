import { NextFunction, Response, Request } from "express";
import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { AppError } from "../errors/AppError";
import { Comment } from "../entities/comment.entity";

const ensureCommentExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const commentId: string = req.params.id;
  const commentRepository: Repository<Comment> = AppDataSource.getRepository(Comment);

  const foundComment = await commentRepository.findOneBy({
    id: commentId,
  });

  if (!foundComment) {
    throw new AppError("Comment not found", 404);
  }

  return next();
};

export default ensureCommentExistsMiddleware;
