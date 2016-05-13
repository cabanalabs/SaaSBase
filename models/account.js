const Joi = require('joi');

module.exports = {
  payload: {
    account: Joi.string(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    created: Joi.forbidden(),
  },
};
