import { z } from "zod";
import { FuelType } from "../entities/poster.entity";

const posterCreateSchema = z.object({
  brand: z.string().max(50),
  model: z.string().max(50),
  year: z.string().max(4).min(4),
  fuel_type: z.nativeEnum(FuelType),
  kilometers: z.number().nonnegative(),
  color: z.string().max(50),
  fipe_price: z.number().nonnegative().lte(9999999.99),
  price: z.number().nonnegative().lte(9999999.99),
  description: z.string(),
  is_published: z.boolean().nullish(),
  images: z
    .object({
      url: z.string(),
    })
    .array(),
});

const posterReturnSchema = posterCreateSchema.extend({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

export { posterCreateSchema, posterReturnSchema };
