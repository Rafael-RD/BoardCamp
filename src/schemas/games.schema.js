import Joi from "joi";

export const gameSchema = Joi.object({
    name: Joi.string().required().trim(),
    image: Joi.string().required().trim(),
    stockTotal: Joi.number().min(1).required(),
    pricePerDay: Joi.number().min(1).required()
});

// const test={
//   id: 1,
//   name: 'Banco Imobiliário',
//   image: 'http://',
//   stockTotal: 3,
//   pricePerDay: 1500
// }

// const validationLog=gameSchema.validate(test,{abortEarly: false});

// console.log(validationLog)
// console.log(validationLog.error)
// console.log(validationLog.error.details)