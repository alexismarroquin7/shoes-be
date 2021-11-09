const db = require('../data/db-config');

const findAll = async () => {
  const rows = await db('shoes as sh')
  .join('brands as br', 'br.brand_id', 'sh.brand_id')
  .join('shoe_styles as sh_sty', 'sh_sty.shoe_style_id', 'sh.shoe_id')
  .select(
    'sh.shoe_id',
    'sh.shoe_name',
    'sh.shoe_description',
    'sh.created_at as shoe_created_at',
    'sh.modified_at as shoe_modified_at',
    
    'sh_sty.shoe_style_id',
    'sh_sty.shoe_style_name',
    'sh_sty.shoe_style_description',
    'sh_sty.created_at as shoe_style_created_at',
    'sh_sty.modified_at as shoe_style_modified_at',
    
    'br.brand_id',
    'br.brand_name',
    'br.brand_description',
    'br.created_at as brand_created_at',
    'br.modified_at as brand_modified_at'
  );

  const shoes = rows.map((shoe) => {
    const { 
      shoe_id,
      shoe_name,
      shoe_description,
      shoe_created_at,
      shoe_modified_at,
      
      shoe_style_id,
      shoe_style_name,
      shoe_style_description,
      shoe_style_created_at,
      shoe_style_modified_at,
      
      brand_id,
      brand_name,
      brand_description,
      brand_created_at,
      brand_modified_at,
    } = shoe;
  
    return {
      shoe_id: shoe_id,
      name: shoe_name,
      description: shoe_description,
      created_at: shoe_created_at,
      modified_at: shoe_modified_at,
      style: {
        shoe_style_id: shoe_style_id,
        name: shoe_style_name,
        description: shoe_style_description,
        created_at: shoe_style_created_at,
        modified_at: shoe_style_modified_at
      },
      brand: {
        brand_id: brand_id,
        name: brand_name,
        description: brand_description,
        created_at: brand_created_at,
        modified_at: brand_modified_at,
      }
    }
  });

  return shoes;
};

module.exports = {
  findAll
}