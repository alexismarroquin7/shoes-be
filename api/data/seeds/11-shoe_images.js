const { shoe_images } = require('../sample-data');
exports.seed = function(knex) {
  return knex('shoe_images').insert(shoe_images);
};
