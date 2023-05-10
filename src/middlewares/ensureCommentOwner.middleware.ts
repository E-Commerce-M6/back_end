import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { AppError } from "../errors/AppError";
import { Comment } from "../entities/comment.entity";

const ensureCommentOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const commentRepository: Repository<Comment> = AppDataSource.getRepository(Comment);
  const foundComment: Comment = await commentRepository.findOne({
    where: {
      id: req.params.id,
    },
    relations: {
      user: true,
    },
  });

  if (foundComment.user.id !== req.user.id) {
    throw new AppError("Must be owner", 403);
  }
  return next();
};

export default ensureCommentOwnerMiddleware;
