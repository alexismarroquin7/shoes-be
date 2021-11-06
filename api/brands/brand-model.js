const db = require('../data/db-config');

const findAll = async () => {
  const brands = await db('brands as b')
  .select(
    'b.brand_id',
    'b.brand_name as name',
    'b.brand_description as description',
    'b.created_at',
    'b.modified_at'
  );
  return brands;
};

const findById = async brand_id => {
  const brand = await db('brands as b')
  .where({ brand_id })
  .select(
    'b.brand_id',
    'b.brand_name as name',
    'b.brand_description as description',
    'b.created_at',
    'b.modified_at'
  )
  .first();
  return brand;
};

const findBy = async filter => {
  const brands = await db('brands as b')
  .where(filter)
  .select(
    'b.brand_id',
    'b.brand_name as name',
    'b.brand_description as description',
    'b.created_at',
    'b.modified_at'
  )
  .orderBy('b.brand_id', 'asc');
  
  return brands;
}

const create = async brand => {
  const brandModel = {
    brand_name: brand.name,
    brand_description: brand.description ? brand.description : null
  };

  const [ newBrand ] = await db('brands as b').insert(brandModel, ['b.brand_id']);
  
  return findById(newBrand.brand_id);
};

const updateById = async (changes, brand_id) => {
  
  const brand = findById(brand_id);

  await db('brands as b').where({ brand_id }).update({
    brand_name: changes.name,
    brand_description: changes.description || brand.description,
    created_at: brand.created_at,
    modified_at: db.fn.now()
  });

  return findById(brand_id);
};

const deleteById = async brand_id => {

  // select brand to delete
  const deletedBrand = await findById(brand_id);

  await db.transaction(async trx => {
    
    // check if any shoes are using the brand to be deleted
    const shoesOfDeletedBrand = await trx('shoes as s')
      .where({ brand_id })
      .select('s.shoe_id');
    
    // if the brand is being used by shoes
    if(shoesOfDeletedBrand){
      // select all shoe ids to delete
      const shoeIdsToDelete = shoesOfDeletedBrand.map(shoe => shoe.shoe_id);
      
      // select shoe_inventory_ids that use shoe ids to delete
      const shoe_inventory_ids = await trx('shoe_inventory as sinv')
        .where(builder => {
          builder.whereIn('sinv.shoe_id', shoeIdsToDelete)
        })
        .select('sinv.shoe_inventory_id');

      if(shoe_inventory_ids){
        // select all shoe_images using shoe_inventory ids to delete
        const shoe_images = await trx('shoe_images as simg')
          .where(builder => {
            builder.whereIn('simg.shoe_inventory_id', shoe_inventory_ids.map(shoe_inv => shoe_inv.shoe_inventory_id))
          })

        // if the shoe has images
        if(shoe_images){
  
          const images_to_delete = shoe_images.map(shoe_image => shoe_image.image_id);
          
          await trx('shoe_images as simg')
            .where(builder => {
              builder.whereIn('simg.shoe_inventory_id', shoe_inventory_ids.map(shoe_inv => shoe_inv.shoe_inventory_id))
            })
            .delete();
        
          await trx('images as img')
            .where(builder => {
              builder.whereIn('img.image_id', images_to_delete)
            })
            .delete();
        }
    
        await trx('shoe_inventory as sinv')
          .where(builder => {
            builder.whereIn('sinv.shoe_id', shoeIdsToDelete)
          })
          .delete();    
      }
      
      await trx('shoes as s')
        .where({ brand_id })
        .delete();
    
    }  
  
  });

  await db('brands as b')
    .where({ brand_id })
    .delete();
    
  return deletedBrand;

};


module.exports = {
  findAll,
  findById,
  findBy,
  create,
  updateById,
  deleteById
}