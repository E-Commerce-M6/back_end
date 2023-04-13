import { Router } from "express";
import { deletePosterController } from "../controllers/posters";

const posterRoutes: Router = Router();

posterRoutes.delete("/:id", deletePosterController);

export default posterRoutes;
