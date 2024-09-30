const Joi = require('joi');

const validationSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(100).required()
});

const databaseSchema = {
  email: {
    type: String,
    hashKey: true
  },
  name: String
};

const validate = (data) => {
  return validationSchema.validate(data);
}

module.exports = {
  schema: databaseSchema,
  validate
};