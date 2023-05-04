import { z } from "zod";
import { userReturnSchema, userUpdateSchema } from "./users.schemas";

const createCommentSchema = z.object({
  content: z.string().nonempty(),
});

const createCommentReturnSchema = createCommentSchema.extend({
  id: z.string(),
  user: userReturnSchema.omit({ address: true }),
  createdAt: z.date().nullish(),
});

export { createCommentSchema, createCommentReturnSchema };
