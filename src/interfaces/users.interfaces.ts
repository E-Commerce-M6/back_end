import { z } from "zod";
import { userCreateSchema, userReturnSchema, userUpdateSchema } from "../schemas/users.schemas";
import { IPosterPagination } from "./posters.interfaces";
import { Poster } from "../entities/poster.entity";

type IUserCreate = z.infer<typeof userCreateSchema>;
type IUserReturn = z.infer<typeof userReturnSchema>;
type IUserUpdate = z.infer<typeof userUpdateSchema>;

interface IPostListByUser extends Omit<IPosterPagination, "data"> {
  data: Poster[];
  sellerData: IUserReturn;
}

export { IUserCreate, IUserReturn, IPostListByUser, IUserUpdate };
