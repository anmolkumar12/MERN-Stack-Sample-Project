const Joi = require("joi");
const customerSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name is required",
  }),
  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  contact: Joi.string().trim().min(10).max(15).required().messages({
    "string.empty": "Contact number is required",
    "string.min": "Contact number must be at least 10 digits",
    "string.max": "Contact number must be at most 15 digits",
  }),
});

module.exports = customerSchema;
