import { z } from "zod";
import { posterCreateSchema, posterReturnSchema } from "../schemas/posters.schemas";
import { DeepPartial } from "typeorm";

type IPosterCreateSchema = z.infer<typeof posterCreateSchema>;
type IPosterReturnSchema = z.infer<typeof posterReturnSchema>;
type IPosterUpdateSchema = DeepPartial<IPosterCreateSchema>;

export { IPosterCreateSchema, IPosterReturnSchema, IPosterUpdateSchema };
