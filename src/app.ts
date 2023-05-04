import "express-async-errors";
import "reflect-metadata";
import express, { Application } from "express";
import handleError from "./errors/handleError";
import cors from "cors";
import {
  posterRoutes,
  loginRoutes,
  usersRoutes,
  resetPasswordRoutes,
  commentRoutes,
} from "./routes";

const app: Application = express();
app.use(express.json());
app.use(cors());

// Coloque suas rotas aqui
app.use("/posters", posterRoutes);
app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/resetPassword", resetPasswordRoutes);
app.use("/posters", commentRoutes);

app.use(handleError);
export default app;
