import Joi from "joi";

export const customerSchema=Joi.object({
    name: Joi.string().min(1).required().trim(),
    phone: Joi.string().min(10).max(11).required().trim(),
    cpf: Joi.string().min(11).max(11).required().trim(),
    birthday: Joi.string().isoDate().required().trim(),
})

// const test = {
//     id: 1,
//     name: 'João Alfredo',
//     phone: '21998899222',
//     cpf: '01234567890',
//     birthday: '1992-10-25'
// }

// const log=customerSchema.validate(test,{abortEarly: false});
// console.log(log)
// console.log(log.error)
// console.log(log.error.details)