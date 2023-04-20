import AppDataSource from "../../data-source";
import QueryString from "qs";
import { Poster } from "../../entities/poster.entity";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/user.entity";
import { userReturnSchema } from "../../schemas/users.schemas";
import { IPostListByUser } from "../../interfaces/users.interfaces";

const listPosterByUserService = async (
  id: string,
  query: QueryString.ParsedQs
): Promise<IPostListByUser> => {
  let { page, perPage } = query;

  let realPage: number;
  let realTake: number;

  realPage = Number(page);
  realTake = Number(perPage);

  if (!perPage || isNaN(realTake) || realTake < 1) {
    perPage = "10";
    realTake = 10;
  }

  if (!page || isNaN(realPage) || realPage < 1) {
    page = "1";
    realPage = 1;
  }

  const posterRepo = AppDataSource.getRepository(Poster);
  const userRepo = AppDataSource.getRepository(User);

  const findedUser = await userRepo.findOneBy({
    id: id,
  });

  if (!findedUser.is_seller) {
    throw new AppError("Not found", 404);
  }

  const userPostListCount = await posterRepo.count({
    where: {
      user: {
        id: id,
      },
    },
  });

  const userPostList = await posterRepo.find({
    take: realTake,
    skip: realPage * realTake - realTake,
    where: {
      user: {
        id: id,
      },
    },
    relations: {
      user: false,
    },
  });

  const prevPage: string | null =
    realPage == 1 ? null : `http://localhost:3000/contact?page=${realPage - 1}&perPage=${realTake}`;

  const nextPage: string | null =
    userPostListCount <= realTake * realPage
      ? null
      : `http://localhost:3000/contact?page=${realPage + 1}&perPage=${realTake}`;

  if (realPage > Math.ceil(userPostListCount / realTake) && realPage > 1) {
    throw new AppError("Invalid page", 400);
  }

  return {
    prev: prevPage,
    next: nextPage,
    count: userPostListCount,
    userData: userReturnSchema.parse(findedUser),
    data: userPostList,
  };
};

export default listPosterByUserService;
