const { images } = require('../sample-data');
exports.seed = function(knex) {
  return knex('images').insert(images);
};
