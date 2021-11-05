const { genders } = require('../sample-data');
exports.seed = function(knex) {
  return knex('genders').insert(genders);
};
