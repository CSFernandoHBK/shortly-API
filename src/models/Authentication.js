import joi from "joi";

const userRegisterSchema = joi.object({
    name: joi.string().required().min(3).max(100),
    password: joi.string().required(),
    email: joi.string().email().required()
})

export default userRegisterSchema;