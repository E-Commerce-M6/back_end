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

export { IPosterCreateSchema, IPosterReturnSchema, IPosterUpdateSchema, IPosterPagination };
