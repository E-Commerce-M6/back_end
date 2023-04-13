import { z } from "zod";
import { posterCreateSchema, posterReturnSchema } from "../schemas/posters.schemas";

type IPosterCreateSchema = z.infer<typeof posterCreateSchema>;
type IPosterReturnSchema = z.infer<typeof posterReturnSchema>;

export { IPosterCreateSchema, IPosterReturnSchema };
