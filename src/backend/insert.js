const model = require('./model');
const { validate } = require('./schema');

async function insert(data) {
  const { error, value } = validate(data);

  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}.`);
  }

  const record = model(value);
  const result = await record.save();

  return result;
}

module.exports = insert;
