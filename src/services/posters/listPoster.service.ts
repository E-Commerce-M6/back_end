import QueryString from "qs";
import AppDataSource from "../../data-source";
import { FuelType, Poster } from "../../entities/poster.entity";
import { Repository } from "typeorm";
import { AppError } from "../../errors/AppError";
import { IPosterPagination } from "../../interfaces/posters.interfaces";
import { posterWithUserReturnSchema, posterQuerySchema } from "../../schemas/posters.schemas";

const listPosterService = async (query: QueryString.ParsedQs): Promise<IPosterPagination> => {
  let valueMAX: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] = "5000000";
  let valueMIN: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] = "0";

  let { page, perPage, model, priceMAX, priceMIN, fuel, ...q } = posterQuerySchema.parse(query);

  if (query.priceMAX) {
    valueMAX = priceMAX;
  }

  if (query.priceMIN) {
    valueMIN = priceMIN;
  }

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

  const findOptions = {
    take: realTake,
    skip: realPage * realTake - realTake,
    where: {
      ...q,
      fuel_type:
        FuelType[
          `${String(fuel)
            .replace(/[ìíîï]/g, "i")
            .toUpperCase()}`
        ],
    },
    relations: {
      images: true,
      user: true,
    },
  };

  const posterRepository: Repository<Poster> = AppDataSource.getRepository(Poster);

  if (!query) {
    delete findOptions.where;
  }

  const posterCount = await posterRepository
    .createQueryBuilder("poster")
    .setFindOptions(findOptions)
    .andWhere("poster.price <= :valueMAX", { valueMAX: valueMAX })
    .andWhere("poster.price >= :valueMIN", { valueMIN: valueMIN })
    .andWhere("poster.model ILIKE :model", { model: `%${model || ""}%` })
    .getCount();

  if (realPage > Math.ceil(posterCount / realTake) && realPage > 1) {
    throw new AppError("Invalid page", 400);
  }

  const posters = await posterRepository
    .createQueryBuilder("poster")
    .setFindOptions(findOptions)
    .andWhere("poster.price <= :valueMAX", { valueMAX: valueMAX })
    .andWhere("poster.price >= :valueMIN", { valueMIN: valueMIN })
    .andWhere("poster.model ILIKE :model", { model: `%${model || ""}%` })
    .skip(findOptions.skip)
    .take(findOptions.take)
    .leftJoinAndSelect("poster.user", "user")
    .orderBy("poster.createdAt", "DESC")
    .getMany();

  const getQuery = () =>
    Object.keys(q)
      .map((key) => `${key}=${q[key]}`)
      .join("&");

  const qp: string = getQuery().length === 0 ? "" : `&${getQuery()}`;
  const prevPage: string | null =
    realPage == 1
      ? null
      : `http://localhost:3000/posters/?page=${+realPage - 1}&perPage=${realTake}${
          priceMAX ? `priceMAX=${priceMAX}` : ""
        }${priceMIN ? `priceMIN=${priceMIN}` : ""}${qp}`;

  const nextPage: string | null =
    posterCount <= realTake * realPage
      ? null
      : `http://localhost:3000/posters/?page=${realPage + 1}&perPage=${realTake}${
          priceMAX ? `priceMAX=${priceMAX}` : ""
        }${priceMIN ? `priceMIN=${priceMIN}` : ""}${model ? `model=${model}` : ""}${qp}`;

  return {
    prev: prevPage,
    next: nextPage,
    count: posterCount,
    data: posters.map((poster) => posterWithUserReturnSchema.parse(poster)),
  };
};

export default listPosterService;
