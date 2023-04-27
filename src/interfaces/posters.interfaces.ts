import { z } from "zod";
import { posterCreateSchema, posterReturnSchema } from "../schemas/posters.schemas";
import { DeepPartial } from "typeorm";
import { Poster } from "../entities/poster.entity";

type IPosterCreateSchema = z.infer<typeof posterCreateSchema>;
type IPosterReturnSchema = z.infer<typeof posterReturnSchema>;
type IPosterUpdateSchema = DeepPartial<IPosterCreateSchema>;

interface IPosterPagination {
  prev: string;
  next: string;
  count: number;
  data: Poster[];
}

interface IPosterFilters {
  brands: string[];
  models: string[];
  colors: string[];
  years: string[];
  fuel_types: string[];
}

export type {
  IPosterCreateSchema,
  IPosterReturnSchema,
  IPosterUpdateSchema,
  IPosterPagination,
  IPosterFilters,
};
