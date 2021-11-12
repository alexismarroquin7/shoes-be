const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('colors as c')
  .select(
    'c.color_id',
    'c.color_name as name',
    'c.color_description as description',
    'c.created_at',
    'c.modified_at',
  );
  return rows;
}

module.exports = {
  findAll
}