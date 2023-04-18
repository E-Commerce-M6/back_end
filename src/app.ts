import "express-async-errors";
import "reflect-metadata";
import express, { Application } from "express";
import handleError from "./errors/handleError";
import cors from "cors";
import { posterRoutes } from "./routes";
import usersRoutes from "./routes/users.routes";

const app: Application = express();
app.use(express.json());
app.use(cors());

// Coloque suas rotas aqui
app.use("/posters", posterRoutes);
app.use("/users", usersRoutes);

app.use(handleError);
export default app;
