import QueryString from "qs";
import AppDataSource from "../../data-source";
import { FuelType, Poster } from "../../entities/poster.entity";
import { IPosterFilters } from "../../interfaces/posters.interfaces";
import { filterQuerySchema } from "../../schemas/posters.schemas";

const getPosterFiltersService = async (query: QueryString.ParsedQs): Promise<IPosterFilters> => {
  let priceValueMAX: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] =
    "999999999";
  let priceValueMIN: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] = "0";
  let kmValueMAX: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] = "999999999";
  let kmValueMIN: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[] = "0";

  let { fuel, published, priceMAX, priceMIN, kmMAX, kmMIN, ...q } = filterQuerySchema.parse(query);

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

  const postRepo = AppDataSource.getRepository(Poster);

  const brands: { poster_brand: string }[] = await postRepo
    .createQueryBuilder("poster")
    .select("poster.brand")
    .setFindOptions({
      where: {
        is_published: published,
        fuel_type:
          FuelType[
            `${String(fuel)
              .replace(/[ìíîï]/g, "i")
              .toUpperCase()}`
          ],
      },
    })
    .andWhere("poster.price <= :priceValueMAX", { priceValueMAX: priceValueMAX })
    .andWhere("poster.price >= :priceValueMIN", { priceValueMIN: priceValueMIN })
    .andWhere("poster.kilometers <= :kmValueMAX", { kmValueMAX: kmValueMAX })
    .andWhere("poster.kilometers >= :kmValueMIN", { kmValueMIN: kmValueMIN })
    .andWhere("poster.year ILIKE :year", { year: `%${q.year || ""}%` })
    .andWhere("poster.color ILIKE :color", { color: `%${q.color || ""}%` })
    .andWhere("poster.model ILIKE :model", { model: `%${q.model || ""}%` })
    .andWhere("poster.brand ILIKE :brand", { brand: `%${q.brand || ""}%` })
    .groupBy("poster.brand")
    .getRawMany();

  const models: { poster_model: string }[] = await postRepo
    .createQueryBuilder("poster")
    .select("poster.model")
    .setFindOptions({
      where: {
        is_published: published,
        fuel_type:
          FuelType[
            `${String(fuel)
              .replace(/[ìíîï]/g, "i")
              .toUpperCase()}`
          ],
      },
    })
    .andWhere("poster.price <= :priceValueMAX", { priceValueMAX: priceValueMAX })
    .andWhere("poster.price >= :priceValueMIN", { priceValueMIN: priceValueMIN })
    .andWhere("poster.kilometers <= :kmValueMAX", { kmValueMAX: kmValueMAX })
    .andWhere("poster.kilometers >= :kmValueMIN", { kmValueMIN: kmValueMIN })
    .andWhere("poster.year ILIKE :year", { year: `%${q.year || ""}%` })
    .andWhere("poster.color ILIKE :color", { color: `%${q.color || ""}%` })
    .andWhere("poster.model ILIKE :model", { model: `%${q.model || ""}%` })
    .andWhere("poster.brand ILIKE :brand", { brand: `%${q.brand || ""}%` })
    .groupBy("poster.model")
    .getRawMany();

  const colors: { poster_color: string }[] = await postRepo
    .createQueryBuilder("poster")
    .select("poster.color")
    .setFindOptions({
      where: {
        is_published: published,
        fuel_type:
          FuelType[
            `${String(fuel)
              .replace(/[ìíîï]/g, "i")
              .toUpperCase()}`
          ],
      },
    })
    .andWhere("poster.price <= :priceValueMAX", { priceValueMAX: priceValueMAX })
    .andWhere("poster.price >= :priceValueMIN", { priceValueMIN: priceValueMIN })
    .andWhere("poster.kilometers <= :kmValueMAX", { kmValueMAX: kmValueMAX })
    .andWhere("poster.kilometers >= :kmValueMIN", { kmValueMIN: kmValueMIN })
    .andWhere("poster.year ILIKE :year", { year: `%${q.year || ""}%` })
    .andWhere("poster.color ILIKE :color", { color: `%${q.color || ""}%` })
    .andWhere("poster.model ILIKE :model", { model: `%${q.model || ""}%` })
    .andWhere("poster.brand ILIKE :brand", { brand: `%${q.brand || ""}%` })
    .groupBy("poster.color")
    .getRawMany();

  const years: { poster_year: string }[] = await postRepo
    .createQueryBuilder("poster")
    .select("poster.year")
    .setFindOptions({
      where: {
        is_published: published,
        fuel_type:
          FuelType[
            `${String(fuel)
              .replace(/[ìíîï]/g, "i")
              .toUpperCase()}`
          ],
      },
    })
    .andWhere("poster.price <= :priceValueMAX", { priceValueMAX: priceValueMAX })
    .andWhere("poster.price >= :priceValueMIN", { priceValueMIN: priceValueMIN })
    .andWhere("poster.kilometers <= :kmValueMAX", { kmValueMAX: kmValueMAX })
    .andWhere("poster.kilometers >= :kmValueMIN", { kmValueMIN: kmValueMIN })
    .andWhere("poster.year ILIKE :year", { year: `%${q.year || ""}%` })
    .andWhere("poster.color ILIKE :color", { color: `%${q.color || ""}%` })
    .andWhere("poster.model ILIKE :model", { model: `%${q.model || ""}%` })
    .andWhere("poster.brand ILIKE :brand", { brand: `%${q.brand || ""}%` })
    .groupBy("poster.year")
    .getRawMany();

  const fuel_types: { poster_fuel_type: string }[] = await postRepo
    .createQueryBuilder("poster")
    .select("poster.fuel_type")
    .setFindOptions({
      where: {
        is_published: published,
        fuel_type:
          FuelType[
            `${String(fuel)
              .replace(/[ìíîï]/g, "i")
              .toUpperCase()}`
          ],
      },
    })
    .andWhere("poster.price <= :priceValueMAX", { priceValueMAX: priceValueMAX })
    .andWhere("poster.price >= :priceValueMIN", { priceValueMIN: priceValueMIN })
    .andWhere("poster.kilometers <= :kmValueMAX", { kmValueMAX: kmValueMAX })
    .andWhere("poster.kilometers >= :kmValueMIN", { kmValueMIN: kmValueMIN })
    .andWhere("poster.year ILIKE :year", { year: `%${q.year || ""}%` })
    .andWhere("poster.color ILIKE :color", { color: `%${q.color || ""}%` })
    .andWhere("poster.model ILIKE :model", { model: `%${q.model || ""}%` })
    .andWhere("poster.brand ILIKE :brand", { brand: `%${q.brand || ""}%` })
    .groupBy("poster.fuel_type")
    .getRawMany();

  return {
    brands: brands.map((brand) => Object.values(brand)[0]),
    models: models.map((model) => Object.values(model)[0]),
    colors: colors.map((color) => Object.values(color)[0]),
    years: years.map((year) => Object.values(year)[0]),
    fuel_types: fuel_types.map((fuel) => Object.values(fuel)[0]),
  };
};

export default getPosterFiltersService;
