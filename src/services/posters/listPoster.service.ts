import QueryString from "qs";
import AppDataSource from "../../data-source";
import { Poster } from "../../entities/poster.entity";
import { Repository } from "typeorm";
import { AppError } from "../../errors/AppError";

const listPosterService = async (query: QueryString.ParsedQs): Promise<any> => {
  const typesQuery = ["year", "fuel_type", "brand", "model", "kilometers", "color", "id"];

  let valueMAX: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] = "5000000";
  let valueMIN: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] = "0";

  let { page, perPage, priceMAX, priceMIN, ...q } = query;

  if (query.priceMAX) {
    valueMAX = priceMAX;
  }

  if (query.priceMIN) {
    valueMIN = priceMIN;
  }

  let realPage: number;
  let realTake: number;

  if (perPage) realTake = +perPage;
  else {
    perPage = "10";
    realTake = 10;
  }

  if (page) realPage = +page === 1 ? 0 : (+page - 1) * realTake;
  else {
    realPage = 0;
    page = "1";
  }
  const findOptions = {
    take: realTake,
    skip: realPage,
    where: { ...q },
    relations: {
      images: true,
    },
  };

  const filtredQuery = Object.keys(findOptions.where).filter(
    (ele) =>
      typesQuery[0] !== ele &&
      typesQuery[1] !== ele &&
      typesQuery[2] !== ele &&
      typesQuery[3] !== ele &&
      typesQuery[4] !== ele &&
      typesQuery[5] !== ele &&
      typesQuery[6] !== ele
  );

  if (filtredQuery[0]) {
    throw new AppError("query paramns is wrong", 400);
  }

  const posterRepository: Repository<Poster> = AppDataSource.getRepository(Poster);

  if (!query) {
    delete findOptions.where;
  }

  const posterCount = await posterRepository
    .createQueryBuilder("poster")
    .setFindOptions(findOptions)
    .getCount();

  const posters = await posterRepository
    .createQueryBuilder("poster")
    .setFindOptions(findOptions)
    .andWhere("poster.price <= :valueMAX", { valueMAX: valueMAX })
    .andWhere("poster.price >= :valueMIN", { valueMIN: valueMIN })
    .skip(findOptions.skip)
    .take(findOptions.take)
    .getMany();

  const getQuery = () =>
    Object.keys(q)
      .map((key) => `${key}=${q[key]}`)
      .join("&");
  const qp: string = getQuery().length === 0 ? "" : `&${getQuery()}`;

  return {
    perPage: realTake,
    page: +page || 1,
    next:
      posterCount > 10 * +page
        ? `http://localhost:3099/posters?perPage=${realTake}&page=${+page + 1}${qp}`
        : null,
    prev:
      +page > 1 ? `http://localhost:3099/posters?perPage=${realTake}&page=${+page - 1}${qp}` : null,
    data: posters,
  };
};

export default listPosterService;
