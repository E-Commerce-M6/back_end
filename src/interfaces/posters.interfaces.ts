import { z } from "zod";
import {
  posterCreateSchema,
  posterReturnSchema,
  posterWithUserReturnSchema,
} from "../schemas/posters.schemas";
import { DeepPartial } from "typeorm";

type IPosterCreateSchema = z.infer<typeof posterCreateSchema>;
type IPosterReturnSchema = z.infer<typeof posterReturnSchema>;
type IPosterUpdateSchema = DeepPartial<IPosterCreateSchema>;
type IPosterReturnWithUserSchema = z.infer<typeof posterWithUserReturnSchema>;

interface IPosterPagination {
  prev: string;
  next: string;
  count: number;
  data: IPosterReturnWithUserSchema[];
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
