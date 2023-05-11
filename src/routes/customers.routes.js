import { Router } from "express";
import { getCustomers, getCustomersById, postCustomers, putCustomers } from "../controllers/customers.controller.js";
import { validationMiddleware } from "../middlewares/validateSchema.middleware.js";
import { customerSchema } from "../schemas/customers.shema.js";

const customersRouter=Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersById);
customersRouter.post("/customers", validationMiddleware(customerSchema), postCustomers);
customersRouter.put("/customers/:id", validationMiddleware(customerSchema), putCustomers);

export default customersRouter;