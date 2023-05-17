import QueryString from "qs";
import AppDataSource from "../../data-source";
import { FuelType, Poster } from "../../entities/poster.entity";
import { FindManyOptions, Repository } from "typeorm";
import { IPosterPagination } from "../../interfaces/posters.interfaces";
import { posterWithUserReturnSchema, posterQuerySchema } from "../../schemas/posters.schemas";

const listPosterService = async (query: QueryString.ParsedQs): Promise<IPosterPagination> => {
  let priceValueMAX: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] =
    "999999999";
  let priceValueMIN: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] = "0";
  let kmValueMAX: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] = "999999999";
  let kmValueMIN: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] = "0";

  let { page, perPage, model, priceMAX, priceMIN, fuel, published, kmMAX, kmMIN, ...q } =
    posterQuerySchema.parse(query);

  if (priceMAX && Number(priceMAX) >= 0) {
    priceValueMAX = priceMAX;
  }

  if (priceMIN && Number(priceMIN) >= 0) {
    priceValueMIN = priceMIN;
  }
  if (kmMAX && Number(kmMAX) >= 0) {
    kmValueMAX = kmMAX;
  }

  if (kmMIN && Number(kmMIN) >= 0) {
    kmValueMIN = kmMIN;
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

  const findOptions: FindManyOptions<Poster> = {
    take: realTake,
    skip: realPage * realTake - realTake,
    where: {
      ...q,
      is_published: published,
      fuel_type:
        FuelType[
          `${String(fuel)
            .replace(/[ìíîï]/g, "i")
            .toUpperCase()}`
        ],
    },
    relations: {
      user: true,
      images: true,
    },
    order: {
      createdAt: "DESC",
    },
  };

  const posterRepository: Repository<Poster> = AppDataSource.getRepository(Poster);

  if (!query) {
    delete findOptions.where;
  }

  const [posters, posterCount] = await posterRepository
    .createQueryBuilder("poster")
    .setFindOptions(findOptions)
    .andWhere("poster.price <= :priceValueMAX", { priceValueMAX: priceValueMAX })
    .andWhere("poster.price >= :priceValueMIN", { priceValueMIN: priceValueMIN })
    .andWhere("poster.kilometers <= :kmValueMAX", { kmValueMAX: kmValueMAX })
    .andWhere("poster.kilometers >= :kmValueMIN", { kmValueMIN: kmValueMIN })
    .andWhere("poster.model ILIKE :model", { model: `%${model || ""}%` })
    .getManyAndCount();

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
    data: posters.map((poster) => {
      return posterWithUserReturnSchema.parse(poster);
    }),
  };
};

export default listPosterService;
