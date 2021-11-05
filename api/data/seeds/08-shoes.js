const { shoes } = require('../sample-data');
exports.seed = function(knex) {
  return knex('shoes').insert(shoes);
};
