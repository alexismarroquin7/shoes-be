const { brands } = require('../sample-data');
exports.seed = function(knex) {
  return knex('brands').insert(brands);
};
