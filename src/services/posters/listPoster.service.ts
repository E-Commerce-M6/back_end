import QueryString from "qs";
import AppDataSource from "../../data-source";
import { Poster } from "../../entities/poster.entity";
import { Repository } from "typeorm";
import { AppError } from "../../errors/AppError";

const listPosterService = async (query: QueryString.ParsedQs): Promise<Array<Poster>> => {
  const types = ["year", "fuel_type", "brand", "model", "kilometers", "color"];

  let valueMAX: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] = "5000000";
  let valueMIN: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] = "0";

  const { priceMAX, priceMIN } = query;
  if (query.priceMAX) {
    valueMAX = priceMAX;
  }

  if (query.priceMIN) {
    valueMIN = priceMAX;
  }

  const options = {
    where: {
      ...query,
    },
  };

  delete options.where.priceMAX;
  delete options.where.priceMIN;

  const filtredQuery = Object.keys(options.where).filter(
    (ele) =>
      types[0] !== ele &&
      types[1] !== ele &&
      types[2] !== ele &&
      types[3] !== ele &&
      types[4] !== ele &&
      types[5] !== ele
  );

  if (filtredQuery[0]) {
    throw new AppError("query paramns is wrong", 400);
  }

  const posterRepository: Repository<Poster> = AppDataSource.getRepository(Poster);

  if (!query) {
    delete options.where;
  }

  const posters = await posterRepository
    .createQueryBuilder("poster")
    .setFindOptions(options)
    .andWhere("poster.price <= :valueMAX", { valueMAX: valueMAX })
    .andWhere("poster.price >= :valueMIN", { valueMIN: valueMIN })
    .getMany();

  return posters;
};

export default listPosterService;
