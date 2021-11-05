const { shoe_styles } = require('../sample-data');
exports.seed = function(knex) {
  return knex('shoe_styles').insert(shoe_styles);
};
