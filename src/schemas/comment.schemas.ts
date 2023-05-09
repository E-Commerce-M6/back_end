import { z } from "zod";
import { userReturnSchema } from "./users.schemas";

const createCommentSchema = z.object({
  content: z.string().nonempty(),
});

const createCommentReturnSchema = createCommentSchema.extend({
  id: z.string(),
  user: userReturnSchema.omit({ address: true }),
  createdAt: z.date().nullish(),
});


const updateCommentSchema = createCommentSchema.partial();

const updateCommentReturnSchema = createCommentSchema.extend({
  id: z.string(),
  user: userReturnSchema.omit({ address: true }),
  createdAt: z.date().nullish(),
});


export { createCommentSchema, createCommentReturnSchema,updateCommentSchema,updateCommentReturnSchema };
