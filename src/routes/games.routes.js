import { Router } from "express";
import { getGames, postGames } from "../controllers/games.controller.js";
import { validationSchema } from "../middlewares/validateSchema.middleware.js";
import { gameSchema } from "../schemas/games.schema.js";

const gamesRouter=Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validationSchema(gameSchema),postGames);


export default gamesRouter;