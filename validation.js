const Joi = require('@hapi/joi');

//REGISTER VALIDATION
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data);
}
//LOGIN VALIDATION
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    });
    return schema.validate(data);
}
//CONTACT VALIDATION
const contactValidation = (data) => {
    const schema = Joi.object({
        first_name: Joi.string()
            .min(3)
            .required(),
        last_name: Joi.string()
            .min(3)
            .required(),
        phone_numbers: Joi.array()
            .items(Joi.string().min(8))
            .required()
    });
    return schema.validate(data);
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.contactValidation = contactValidation;