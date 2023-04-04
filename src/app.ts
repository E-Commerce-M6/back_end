import "express-async-errors";
import "reflect-metadata";
import express, { Application } from "express";
import handleError from "./errors/handleError";
import cors from "cors";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(handleError);

// Coloque suas rotas aqui

export default app;
