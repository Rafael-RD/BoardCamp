import Joi from "joi";

export const customerSchema=Joi.object({
    name: Joi.string().min(1).required().trim(),
    phone: Joi.number().min(10).max(11).required(),
    cpf: Joi.number().min(11).max(11).required(),
    birthday: Joi.string().isoDate().required().trim(),
});