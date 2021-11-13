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

const findBy = async (filter) => {
  const rows = await db('shoes as sh')
  .join('brands as br', 'br.brand_id', 'sh.brand_id')
  .join('shoe_styles as sh_sty', 'sh_sty.shoe_style_id', 'sh.shoe_style_id')
  .where(filter)
  .select(
    'sh.shoe_id',
    'sh.shoe_name',
    'sh.shoe_description',
    'sh.created_at as shoe_created_at',
    'sh.modified_at as shoe_modified_at',
    
    'sh.shoe_style_id',
    'sh_sty.shoe_style_name',
    'sh_sty.shoe_style_description',
    'sh_sty.created_at as shoe_style_created_at',
    'sh_sty.modified_at as shoe_style_modified_at',
    
    'sh.brand_id',
    'br.brand_name',
    'br.brand_description',
    'br.created_at as brand_created_at',
    'br.modified_at as brand_modified_at'
  );
  
  if(rows && Array.isArray(rows) && rows.length > 0){

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
  } else {
    return [];
  }

}

const create = async (shoe) => {
  const [ newShoe ] = await db('shoes as sh').insert({
    shoe_name: shoe.name,
    shoe_description: shoe.description ? shoe.description : null,
    brand_id: shoe.brand.brand_id,
    shoe_style_id: shoe.style.shoe_style_id
  }, ['sh.shoe_id']);

  if(shoe.models && Array.isArray(shoe.models) && shoe.models.length > 0){
    const images = [];
    
    const shoeInventoryListToCreate = shoe.models.map(model => {
      
      model.images.forEach(image => {
        images.push({
          image_name: image.name,
          image_title: image.title,
          image_alt: image.alt,
          image_src: image.src
        })
      });

      return {
        shoe_id: newShoe.shoe_id, 
        shoe_inventory_price: model.price,
        shoe_inventory_quantity: model.quantity,
        gender_id: model.gender.gender_id,
        color_id: model.color.color_id,
        shoe_size_id: model.size.shoe_size_id
      }
    });
    
    const shoeInventoryIds = await db('shoe_inventory as sh_inv').insert(shoeInventoryListToCreate, ['sh_inv.shoe_inventory_id']);
    
    
    const modelsWithShoeInventoryId = shoe.models.map((model, i) => {
      model.shoe_inventory_id = shoeInventoryIds[i].shoe_inventory_id;
      return model;
    });
    
    const imagesCreated = await db('images as img').insert(images, ['img.image_name', 'img.image_id']);
    
    const shoeInventoryImages = [];
    
    modelsWithShoeInventoryId.forEach((model) => {
    
      model.images.forEach(image => {
    
        const [matchingImage] = imagesCreated.filter(imageCreated => imageCreated.image_name === image.name);
    
        shoeInventoryImages.push({
          shoe_inventory_id: model.shoe_inventory_id,
          image_id: matchingImage.image_id
        })
    
      });
    });
    
    await db('shoe_images as sh_img').insert(shoeInventoryImages);

  }
  
  const [newShoeFormatted] = await findBy({ shoe_id: newShoe.shoe_id });
  
  return newShoeFormatted;
}

module.exports = {
  findAll,
  findBy,
  create
}