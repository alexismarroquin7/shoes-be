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

const findById = async (shoe_style_id) => {
  const shoe_style = await db('shoe_styles as sh_sty')
  .where({ shoe_style_id })
  .select(
    'sh_sty.shoe_style_id',
    'sh_sty.shoe_style_name as name',
    'sh_sty.shoe_style_description as description',
    'sh_sty.created_at',
    'sh_sty.modified_at',
  )
  .first();
  return shoe_style;
}

const findBy = async (filter) => {
  const rows = await db('shoe_styles as sh_sty')
  .where(filter)
  .select(
    'sh_sty.shoe_style_id',
    'sh_sty.shoe_style_name as name',
    'sh_sty.shoe_style_description as description',
    'sh_sty.created_at',
    'sh_sty.modified_at',
  );
  return rows;
}

const create = async ({ name, description }) => {
  const [ newShoeStyle ] = await db('shoe_styles as sh_sty').insert({
    shoe_style_name: name,
    shoe_style_description: description ? description : null
  }, ['sh_sty.shoe_style_id']);

  return findById(newShoeStyle.shoe_style_id);
}

module.exports = {
  findAll,
  findById,
  findBy,
  create
}