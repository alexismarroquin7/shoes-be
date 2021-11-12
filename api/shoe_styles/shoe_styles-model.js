const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('shoe_styles as sh_sty')
  .select(
    'sh_sty.shoe_style_id',
    'sh_sty.shoe_style_name as name',
    'sh_sty.shoe_style_description as description',
    'sh_sty.created_at',
    'sh_sty.modified_at',
  );
  return rows;
}

module.exports = {
  findAll
}