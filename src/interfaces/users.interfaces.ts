import { z } from "zod";
import { DeepPartial } from "typeorm";
import { userCreateSchema, userReturnSchema } from "../schemas/users.schemas";

type IUserCreate = z.infer<typeof userCreateSchema>;
type IUserReturn = z.infer<typeof userReturnSchema>;

export { IUserCreate, IUserReturn };
