const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('shoe_sizes as sh_siz')
  .join('countries as ct', 'ct.country_id', 'sh_siz.country_id')
  .join('genders as gen', 'gen.gender_id', 'sh_siz.gender_id')
  .select(
    'sh_siz.shoe_size_id',
    'sh_siz.shoe_size_amount',
    'sh_siz.created_at as shoe_size_created_at',
    'sh_siz.modified_at as shoe_size_modified_at',
    
    'sh_siz.country_id',
    'ct.country_name',
    'ct.country_name_abreviation',
    'ct.created_at as country_created_at',
    'ct.modified_at as country_modified_at',
    
    'sh_siz.gender_id',
    'gen.gender_name',
    'gen.created_at as gender_created_at',
    'gen.modified_at as gender_modified_at'

  );
  
  const shoeSizes = rows.map((row) => {
    return {
      shoe_size_id: row.shoe_size_id,
      amount: row.shoe_size_amount,
      created_at: row.shoe_size_created_at,
      modified_at: row.shoe_size_modified_at,

      country: {
        country_id: row.country_id,
        name: row.country_name,
        name_abreviation: row.country_name_abreviation,
        created_at: row.country_created_at,
        modified_at: row.country_modified_at,
      },
      gender: {
        gender_id: row.gender_id,
        name: row.gender_name,
        created_at: row.gender_created_at,
        modified_at: row.gender_modified_at
      }
    }
  })
  return shoeSizes;
}

module.exports = {
  findAll
}