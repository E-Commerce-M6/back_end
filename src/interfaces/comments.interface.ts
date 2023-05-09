import { DeepPartial } from "typeorm/common/DeepPartial";
import { z } from "zod";
import { createCommentSchema, createCommentReturnSchema } from "./../schemas/comment.schemas";

type ICommentCreateSchema = z.infer<typeof createCommentSchema>;
type ICommentReturnSchema = z.infer<typeof createCommentReturnSchema>;

type ICommentUpdateSchema = DeepPartial<ICommentCreateSchema>;


export type { ICommentCreateSchema, ICommentReturnSchema,ICommentUpdateSchema };
