import app from "./app";
import AppDataSource from "./data-source";

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.log("Error during initialization database", err);
  });
  console.log("Database conected!");
  app.listen(3099, () => {
    console.log("Server connected at http://localhost:3099");
  });
})();
