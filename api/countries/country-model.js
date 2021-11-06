const db = require('../data/db-config');

const findAll = async () => {
  const countries = await db('countries as c')
    .select(
      'c.country_id',
      'c.country_name as name',
      'c.country_name_abreviation as abreviation',
      'c.created_at',
      'c.modified_at'
    );
  return countries;
};

const findById = async country_id => {
  const country = await db('countries as c')
    .where({ country_id })
    .select(
      'c.country_id',
      'c.country_name as name',
      'c.country_name_abreviation as abreviation',
      'c.created_at',
      'c.modified_at'
    )
    .first();
  return country;
};

const findBy = async filter => {
  const countries = await db('countries as c')
  .where(filter)
  .select(
    'c.country_id',
    'c.country_name as name',
    'c.country_name_abreviation as abreviation',
    'c.created_at',
    'c.modified_at'
  )
  .orderBy('c.country_id', 'asc');
  return countries;
};

const create = async country => {
  const countryModel = {
    country_name: country.name,
    country_name_abreviation: country.abreviation,
  };

  const [newCountry] = await db('countries as c').insert(countryModel, ['c.country_id']);
  return findById(newCountry.country_id);
};

const updateById = async (changes, country_id) => {
  const countryModel = {
    country_name: changes.name,
    country_name_abreviation: changes.abreviation,
    modified_at: db.fn.now()
  };
  await db('countries as c').where({ country_id }).update(countryModel);
  return findById(country_id);
};

const deleteById = () => {
  
};

module.exports = {
  findAll,
  findById,
  findBy,
  create,
  updateById,
  deleteById
};