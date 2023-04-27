import QueryString from "qs";
import AppDataSource from "../../data-source";
import { FuelType, Poster } from "../../entities/poster.entity";
import { AppError } from "../../errors/AppError";
import { IPosterFilters } from "../../interfaces/posters.interfaces";

const getPosterFiltersService = async (query: QueryString.ParsedQs): Promise<IPosterFilters> => {
  let { ...q } = query;
  const expectedQuerys = ["brand", "model", "color", "year", "fuel"];
  const postRepo = AppDataSource.getRepository(Poster);

  const validQuery = Object.keys(q).every((el) => expectedQuerys.includes(el));

  if (!validQuery) {
    throw new AppError("query paramns is wrong", 400);
  }

  const brands: { poster_brand: string }[] = await postRepo
    .createQueryBuilder("poster")
    .select("poster.brand")
    .setFindOptions({
      where: {
        fuel_type: FuelType[`${String(q.fuel).toUpperCase()}`],
      },
    })
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
        fuel_type: FuelType[`${String(q.fuel).toUpperCase()}`],
      },
    })
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
        fuel_type: FuelType[`${String(q.fuel).toUpperCase()}`],
      },
    })
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
        fuel_type: FuelType[`${String(q.fuel).toUpperCase()}`],
      },
    })
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
        fuel_type: FuelType[`${String(q.fuel).toUpperCase()}`],
      },
    })
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
