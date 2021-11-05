const { shoe_sizes } = require('../sample-data');
exports.seed = function(knex) {
  return knex('shoe_sizes').insert(shoe_sizes);
};
