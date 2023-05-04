import { z } from "zod";

const createCommentSchema = z.object({
  content: z.string().nonempty(),
});

const createCommentReturnSchema = createCommentSchema.extend({
  id: z.string(),
  createdAt: z.date().nullish(),
});

export { createCommentSchema, createCommentReturnSchema };
