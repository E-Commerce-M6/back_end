import { z } from "zod";
import { userCreateSchema, userReturnSchema } from "../schemas/users.schemas";
import { Poster } from "../entities/poster.entity";
import { IPosterPagination } from "./posters.interfaces";

type IUserCreate = z.infer<typeof userCreateSchema>;
type IUserReturn = z.infer<typeof userReturnSchema>;

interface IPostListByUser extends IPosterPagination {
  sellerData: IUserReturn;
}

export { IUserCreate, IUserReturn, IPostListByUser };
