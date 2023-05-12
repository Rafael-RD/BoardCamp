import Joi from "joi";

export const customerSchema=Joi.object({
    name: Joi.string().min(1).required().trim(),
    phone: Joi.string().min(10).max(11).required().trim(),
    cpf: Joi.string().min(11).max(11).required().trim(),
    birthday: Joi.string().isoDate().required().trim(),
});