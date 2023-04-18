import { z } from "zod";

const addressCreateSchema = z.object({
  id: z.string(),
  zip_code: z.string().min(8).max(8),
  state: z.string().min(2).max(2),
  city: z.string().max(50),
  street: z.string().max(127),
  number: z.string().max(20).nullish(),
  complement: z.string().max(127).nullish(),
});

const userReturnSchema = z.object({
  id: z.string(),
  name: z.string().max(127),
  email: z.string().email().max(50),
  cpf: z.string().max(11).min(11),
  phone: z.string().max(13).min(11),
  birth_date: z.string(),
  is_seller: z.boolean(),
  description: z.string().min(10),
  address: addressCreateSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

const userCreateSchema = userReturnSchema
  .omit({
    createdAt: true,
    deletedAt: true,
    updatedAt: true,
    id: true,
    address: true,
  })
  .extend({
    password: z.string(),
    address: addressCreateSchema.omit({ id: true }),
  });

export { userCreateSchema, userReturnSchema };
