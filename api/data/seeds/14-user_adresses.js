const { user_adresses } = require('../sample-data');
exports.seed = function(knex) {
  return knex('user_adresses').insert(user_adresses);
};