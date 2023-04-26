import { z } from "zod";
import { userCreateSchema, userReturnSchema, userUpdateSchema } from "../schemas/users.schemas";
import { IPosterPagination } from "./posters.interfaces";

type IUserCreate = z.infer<typeof userCreateSchema>;
type IUserReturn = z.infer<typeof userReturnSchema>;
type IUserUpdate = z.infer<typeof userUpdateSchema>;

interface IPostListByUser extends IPosterPagination {
  sellerData: IUserReturn;
}

export { IUserCreate, IUserReturn, IPostListByUser, IUserUpdate };
