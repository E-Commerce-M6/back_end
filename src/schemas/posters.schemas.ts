import { z } from "zod";
import { FuelType } from "../entities/poster.entity";
import { userReturnSchema } from "./users.schemas";

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
});

const posterReturnSchema = posterCreateSchema.extend({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  images: z
    .object({
      id: z.number(),
      url: z.string(),
    })
    .array(),
});

const posterUpdateSchema = posterCreateSchema.partial();

const posterWithUserReturnSchema = posterReturnSchema
  .extend({
    user: userReturnSchema.omit({ address: true }),
  })
  .transform((data) => {
    data.images.sort((a, b) => a.id - b.id);
    return data;
  });

const queryPaginateSchema = z
  .object({
    page: z.string().default("1"),
    perPage: z.string().default("12"),
  })
  .partial();

const filterQuerySchema = z
  .object({
    year: z.string(),
    fuel: z.string(),
    brand: z.string(),
    model: z.string(),
    color: z.string(),
    priceMAX: z.string(),
    priceMIN: z.string(),
    kmMAX: z.string(),
    kmMIN: z.string(),
    published: z.string().transform((value) => {
      if (value.toLowerCase() == "true" || Number(value) > 0) {
        return true;
      } else {
        return false;
      }
    }),
  })
  .partial();

const posterQuerySchema = queryPaginateSchema
  .extend({
    published: z.string().transform((value) => {
      if (value.toLowerCase() == "true" || Number(value) > 0) {
        return true;
      } else {
        return false;
      }
    }),
    priceMAX: z.string(),
    priceMIN: z.string(),
    year: z.string(),
    fuel: z.string(),
    brand: z.string(),
    model: z.string(),
    color: z.string(),
    kmMAX: z.string(),
    kmMIN: z.string(),
  })
  .partial();

export {
  posterCreateSchema,
  posterReturnSchema,
  posterUpdateSchema,
  posterWithUserReturnSchema,
  posterQuerySchema,
  filterQuerySchema,
};
