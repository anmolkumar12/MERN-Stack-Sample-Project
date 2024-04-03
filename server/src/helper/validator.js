const Joi = require("joi");

module.exports.validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const formattedErrors = error.details.map((detail) => ({
        message: detail.message,
      }));
      return res.status(400).json({ errors: formattedErrors });
    }
    next();
  };
};
