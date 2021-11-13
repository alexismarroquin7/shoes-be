const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('genders as g')
  .select(
    'g.gender_id',
    'g.gender_name as name',
    'g.created_at',
    'g.modified_at',
  );
  return rows;
}

module.exports = {
  findAll
}