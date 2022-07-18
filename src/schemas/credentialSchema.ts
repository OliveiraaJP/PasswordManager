import joi from "joi"

export const createCredentialSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
    url: joi.string().uri().required(),
    title: joi.string().required(),
    name: joi.string().required()
})