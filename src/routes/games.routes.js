import { Router } from "express";
import { getGames, postGames } from "../controllers/games.controller.js";
import { validationMiddleware } from "../middlewares/validateSchema.middleware.js";
import { gameSchema } from "../schemas/games.schema.js";

const gamesRouter=Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validationMiddleware(gameSchema),postGames);

export default gamesRouter;