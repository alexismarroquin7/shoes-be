const { countries } = require('../sample-data');
exports.seed = function(knex) {
  return knex('countries').insert(countries);
};
