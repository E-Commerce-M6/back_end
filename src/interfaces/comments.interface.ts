import { z } from "zod";
import { createCommentSchema, createCommentReturnSchema } from "./../schemas/comment.schemas";

type ICommentCreateSchema = z.infer<typeof createCommentSchema>;
type ICommentReturnSchema = z.infer<typeof createCommentReturnSchema>;

export type { ICommentCreateSchema, ICommentReturnSchema };
