import { Router } from "express";
import { deleteRentals, getRentals, postRentals, postReturnRentals } from "../controllers/rentals.controller.js";
import { validationMiddleware } from "../middlewares/validateSchema.middleware.js";
import { rentalsSchema } from "../schemas/rentals.schema.js";

const rentalsRouter=Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validationMiddleware(rentalsSchema), postRentals);
rentalsRouter.post("/rentals/:id/return", postReturnRentals)
rentalsRouter.delete("/rentals/:id", deleteRentals);

export default rentalsRouter;