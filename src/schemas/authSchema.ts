import joi from "joi"

export const signupSchema = joi.object({
    user: joi.string().email().required(),
    name: joi.string().required(),
    password: joi.string().required().min(10),
    confirmPassword: joi.ref('password')
})

export const signinSchema = joi.object({
    user: joi.string().email().required(),
    password: joi.string().required().min(10)
})