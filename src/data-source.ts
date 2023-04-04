import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";
import "dotenv/config";

const dataSourceConfig = (): DataSourceOptions => {
  const nodeEnv = process.env.NODE_ENV;
  const migrationsPath = path.join(__dirname, "./migrations/**.{js,ts}");
  const entitiesPath = path.join(__dirname, "./entities/**.{js,ts}");

  if (nodeEnv == "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitiesPath],
    };
  }

  return {
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: false,
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
};

const AppDataSource = new DataSource(dataSourceConfig());

export default AppDataSource;
