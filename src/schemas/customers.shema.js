import Joi from "joi";

export const customerSchema=Joi.object({
    name: Joi.string().min(1).required().trim(),
    phone: Joi.string().min(10).max(11).required(),
    cpf: Joi.string().min(11).max(11).pattern(/^[0-9]+$/).required(),
    birthday: Joi.string().isoDate().required().trim(),
});