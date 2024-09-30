const dynamoose = require('dynamoose');
const { schema } = require('./schema');

const { SIGNUPS_TABLE } = process.env;

const SignupModel = dynamoose.model(SIGNUPS_TABLE, schema, { throughput: 'ON_DEMAND', waitForActive: true });

const model = (data) => {
  return new SignupModel(data);
}

module.exports = model;