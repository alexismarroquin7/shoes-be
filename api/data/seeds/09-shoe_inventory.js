const { shoe_inventory } = require('../sample-data');
exports.seed = function(knex) {
  return knex('shoe_inventory').insert(shoe_inventory);
};
