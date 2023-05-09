import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import { ICommentUpdateSchema, ICommentReturnSchema } from "../../interfaces/comments.interface";
import { Comment } from "../../entities/comment.entity";
import { createCommentReturnSchema } from "../../schemas/comment.schemas";

const updateCommentService = async (
  commentUpdateData: ICommentUpdateSchema,
  commentId: string
): Promise<ICommentReturnSchema> => {
  const commentRepository: Repository<Comment> = AppDataSource.getRepository(Comment);

  const commentData = await commentRepository.findOne({
    where: {
      id: commentId,
    },
  });

  const comment = commentRepository.create({
    ...commentData,
    ...commentUpdateData,
  });

  await commentRepository.save(comment);

  const returnComment = await commentRepository.findOne({
    where: {
      id: comment.id,
    },
    relations: {
      user: true,
    },
  });

  return createCommentReturnSchema.parse(returnComment);
};

export default updateCommentService;
