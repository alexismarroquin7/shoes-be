const { colors } = require('../sample-data');
exports.seed = function(knex) {
  return knex('colors').insert(colors);
};
