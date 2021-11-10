const { user_payments } = require('../sample-data');
exports.seed = function(knex) {
  return knex('user_payments').insert(user_payments);
};