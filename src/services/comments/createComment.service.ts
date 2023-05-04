import { Repository } from "typeorm";

import AppDataSource from "../../data-source";
import { ICommentCreateSchema, ICommentReturnSchema } from "../../interfaces/comments.interface";
import { Comment } from "../../entities/comment.entity";
import { createCommentReturnSchema } from "../../schemas/comment.schemas";

const createCommentService = async (
  commentData: ICommentCreateSchema,
  userId: string,
  posterId: string
): Promise<ICommentReturnSchema> => {
  const commentRepository: Repository<Comment> = AppDataSource.getRepository(Comment);
  const comment = commentRepository.create({
    user: {
      id: userId,
    },
    poster: {
      id: posterId,
    },
    ...commentData,
  });
  await commentRepository.save(comment);

  const returnComment = createCommentReturnSchema.parse(comment);

  return returnComment;
};

export default createCommentService;
