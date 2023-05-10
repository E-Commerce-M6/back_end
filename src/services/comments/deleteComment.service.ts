import { Repository } from "typeorm";
import { Comment } from "../../entities/comment.entity";
import AppDataSource from "../../data-source";

const deleteCommentService = async (commentId: string): Promise<void> => {
  const commentRepository: Repository<Comment> = AppDataSource.getRepository(Comment);

  await commentRepository.delete({
    id: commentId,
  });
};

export default deleteCommentService;