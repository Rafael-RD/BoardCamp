import Joi from "joi";

export const rentalsSchema=Joi.object({
    customerId: Joi.number().min(1).required(),
    gameId: Joi.number().min(1).required(),
    daysRented: Joi.number().min(1).required()
});