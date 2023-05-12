import { Repository } from "typeorm";
import AppDataSource from "../../data-source";
import { ICommentReturnSchema } from "../../interfaces/comments.interface";
import { Comment } from "../../entities/comment.entity";
import { createCommentReturnSchema } from "../../schemas/comments.schemas";

const getCommentsByPostIdService = async (postId: string): Promise<ICommentReturnSchema[]> => {
  const commentRepository: Repository<Comment> = AppDataSource.getRepository(Comment);

  const comments: Comment[] = await commentRepository.find({
    where: { poster: { id: postId } },
    relations: { user: true },
    order: {
      createdAt: "DESC",
    },
  });

  const returnComments: ICommentReturnSchema[] = comments.map((comment: Comment) => {
    return createCommentReturnSchema.parse(comment);
  });
  return returnComments;
};

export default getCommentsByPostIdService;
