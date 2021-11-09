const db = require('../data/db-config');

const getUniqueValues = (array, cb) => {
  return [...new Set(array.map(cb))];
};

const findAll = async query => {
  const shoe_inventory = await db('shoe_inventory as sh_inv')
  .leftJoin('shoes as s', 's.shoe_id', 'sh_inv.shoe_id')
  .leftJoin('brands as b', 'b.brand_id', 's.brand_id')
  .leftJoin('colors as col', 'col.color_id', 'sh_inv.color_id')
  .leftJoin('shoe_sizes as sh_sizes', 'sh_sizes.shoe_size_id', 'sh_inv.shoe_size_id')
  .leftJoin('shoe_styles as sh_styles', 'sh_styles.shoe_style_id', 's.shoe_style_id')
  .leftJoin('countries as ct', 'ct.country_id', 'sh_sizes.country_id')
  .leftJoin('shoe_images as sh_img', 'sh_img.shoe_inventory_id', 'sh_inv.shoe_inventory_id') // check if works when shoe has not images
  .leftJoin('images as img', 'img.image_id', 'sh_img.image_id') // check if works when shoe has not images
  .leftJoin('genders as g', 'g.gender_id', 'sh_inv.gender_id')
  .leftJoin('genders as gen', 'gen.gender_id', 'sh_sizes.gender_id')
  .select(
    // shoe inventory
    'sh_inv.shoe_inventory_id', // id
    'sh_inv.shoe_inventory_quantity', // quantity in stock
    'sh_inv.shoe_inventory_price', // price
    'sh_inv.created_at as shoe_inventory_created_at', // created_at
    'sh_inv.modified_at as shoe_inventory_modified_at', // modified_at
    
    'sh_inv.gender_id as shoe_inventory_gender_id', // shoe gender id
    'g.gender_name as shoe_inventory_gender_name', // shoe gender name
    'g.created_at as shoe_inventory_gender_created_at', 
    'g.modified_at as shoe_inventory_gender_modified_at', 
    
    // shoes
    'sh_inv.shoe_id', // id
    's.shoe_name', // name
    's.shoe_description', // description
    's.created_at as shoe_created_at',
    's.modified_at as shoe_modified_at',
    
    // colors
    'sh_inv.color_id', // id
    'col.color_name', // name
    'col.color_description', // description
    'col.created_at as color_created_at',
    'col.modified_at as color_modified_at',
    
    // brands
    's.brand_id', // id
    'b.brand_name', // name
    'b.brand_description', // description
    'b.created_at as brand_created_at',
    'b.modified_at as brand_modified_at',

    // shoe_sizes
    'sh_inv.shoe_size_id', // shoe_size_id
    'sh_sizes.shoe_size_amount', // shoe_size_amount
    'sh_sizes.created_at as shoe_size_created_at',
    'sh_sizes.modified_at as shoe_size_modified_at',
    
    'sh_sizes.gender_id as shoe_size_gender_id', 
    'gen.gender_name as shoe_size_gender_name',
    'gen.created_at as shoe_size_gender_created_at',
    'gen.modified_at as shoe_size_gender_modified_at',

    // shoe_styles
    's.shoe_style_id', // id
    'sh_styles.shoe_style_name', // name
    'sh_styles.shoe_style_description', // description
    'sh_styles.created_at as shoe_style_created_at', // created_at
    'sh_styles.modified_at as shoe_style_modified_at', // modified_at
    
    // countries
    'ct.country_id', // id
    'ct.country_name', // name
    'ct.country_name_abreviation', // abreviation
    'ct.created_at as country_created_at',
    'ct.modified_at as country_modified_at',
    
    // images
    'sh_img.image_id', // id
    'img.image_name', // name
    'img.image_src', // src
    'img.image_alt', // alt
    'img.image_title', // title
    'img.created_at as image_created_at',
    'img.modified_at as image_modified_at',
  )

  const uniqueShoeInventoryIds = getUniqueValues(shoe_inventory, item => item.shoe_inventory_id);

  let rows = uniqueShoeInventoryIds.map(unique_shoe_inventory_id => {
    const matchingShoeInventoryIds = shoe_inventory.filter(shoe_inv => {
      return shoe_inv.shoe_inventory_id === unique_shoe_inventory_id
    });

    const matchingShoeInventoryIdsReducer = (acc, curr) => {      
      // shoe_inventory
      acc.shoe_inventory_id = curr.shoe_inventory_id; // id
      acc.quantity = curr.shoe_inventory_quantity; // quantity
      acc.price = curr.shoe_inventory_price; // price
      acc.created_at = curr.shoe_inventory_created_at; // created_at
      acc.modified_at = curr.shoe_inventory_modified_at; // modified_at
      
      // shoe
      acc.shoe.shoe_id = curr.shoe_id; // id
      acc.shoe.name = curr.shoe_name; // name
      acc.shoe.description = curr.shoe_description; // description
      acc.shoe.created_at = curr.shoe_created_at; // created_at
      acc.shoe.modified_at = curr.shoe_modified_at; // modified_at
            
      // shoe_style
      acc.shoe.style.shoe_style_id = curr.shoe_style_id; // id
      acc.shoe.style.name = curr.shoe_style_name; // name
      acc.shoe.style.description = curr.shoe_style_description; // description
      acc.shoe.style.created_at = curr.shoe_style_created_at; // created_at
      acc.shoe.style.modified_at = curr.shoe_style_modified_at; // created_at

      acc.shoe.style.gender.gender_id = curr.shoe_inventory_gender_id;
      acc.shoe.style.gender.name = curr.shoe_inventory_gender_name;
      acc.shoe.style.gender.created_at = curr.shoe_inventory_gender_created_at;
      acc.shoe.style.gender.modified_at = curr.shoe_inventory_gender_modified_at;
      
      // color
      acc.shoe.style.color.color_id = curr.color_id;
      acc.shoe.style.color.name = curr.color_name;
      acc.shoe.style.color.description = curr.color_description;
      acc.shoe.style.color.created_at = curr.color_created_at;
      acc.shoe.style.color.modified_at = curr.color_modified_at;
      
      // shoe_size
      acc.shoe.size.shoe_size_id = curr.shoe_size_id; // id
      acc.shoe.size.amount = curr.shoe_size_amount; // amount
      acc.shoe.size.created_at = curr.shoe_size_created_at; // created_at
      acc.shoe.size.modified_at = curr.shoe_size_modified_at; // modified_at
      
      // shoe_size_country
      acc.shoe.size.country.country_id = curr.country_id; // id
      acc.shoe.size.country.name = curr.country_name; // name
      acc.shoe.size.country.name_abreviation = curr.country_name_abreviation; // country_name_abreviation
      acc.shoe.size.country.created_at = curr.country_created_at; // created_at
      acc.shoe.size.country.modified_at = curr.country_modified_at; // modified_at
      
      // shoe_size_gender
      acc.shoe.size.gender.gender_id = curr.shoe_size_gender_id; // id
      acc.shoe.size.gender.name = curr.shoe_size_gender_name; // name
      acc.shoe.size.gender.created_at = curr.shoe_size_gender_created_at; // created_at
      acc.shoe.size.gender.modified_at = curr.shoe_size_modified_at; // modified_at
      
      // brand_id
      acc.shoe.brand.brand_id = curr.brand_id; // id
      acc.shoe.brand.name = curr.brand_name; // name
      acc.shoe.brand.description = curr.brand_description; // description
      acc.shoe.brand.created_at = curr.brand_created_at; // created_at
      acc.shoe.brand.modified_at = curr.brand_modified_at; // modified_at
      
      curr.image_id && acc.shoe.images.push({
        image_id: curr.image_id,
        name: curr.image_name,
        title: curr.image_title,
        alt: curr.image_alt,
        src: curr.image_src,
        created_at: curr.image_created_at,
        modified_at: curr.image_modified_at
      });

      return acc;
    };

    const model = {
      shoe: {
        brand: {},
        size: { country: {}, gender: {} },
        style: { gender: {}, color: {} },
        images: []
      }
    }

    const shoe_inventory_item_model = matchingShoeInventoryIds.reduce(matchingShoeInventoryIdsReducer, model);
    
    
    return shoe_inventory_item_model;
  });
  
  if(
    rows === null ||
    !Array.isArray(rows)
  ){
    return null;
  }

  if(query && query.shoe_id){
    rows = rows.filter(shoe_inv => shoe_inv.shoe.shoe_id === Number(query.shoe_id))
  }

  return rows.length > 0 ? rows : null;
}

const findById = async shoe_inventory_id => {
  const shoe_inventory = await db('shoe_inventory as sh_inv')
  .leftJoin('shoes as s', 's.shoe_id', 'sh_inv.shoe_id')
  .leftJoin('brands as b', 'b.brand_id', 's.brand_id')
  .leftJoin('colors as col', 'col.color_id', 'sh_inv.color_id')
  .leftJoin('shoe_sizes as sh_sizes', 'sh_sizes.shoe_size_id', 'sh_inv.shoe_size_id')
  .leftJoin('shoe_styles as sh_styles', 'sh_styles.shoe_style_id', 's.shoe_style_id')
  .leftJoin('countries as ct', 'ct.country_id', 'sh_sizes.country_id')
  .leftJoin('shoe_images as sh_img', 'sh_img.shoe_inventory_id', 'sh_inv.shoe_inventory_id') // check if works when shoe has not images
  .leftJoin('images as img', 'img.image_id', 'sh_img.image_id') // check if works when shoe has not images
  .leftJoin('genders as g', 'g.gender_id', 'sh_inv.gender_id')
  .leftJoin('genders as gen', 'gen.gender_id', 'sh_sizes.gender_id')
  .select(
    // shoe inventory
    'sh_inv.shoe_inventory_id', // id
    'sh_inv.shoe_inventory_quantity', // quantity in stock
    'sh_inv.shoe_inventory_price', // price
    'sh_inv.created_at as shoe_inventory_created_at', // created_at
    'sh_inv.modified_at as shoe_inventory_modified_at', // modified_at
    
    'sh_inv.gender_id as shoe_inventory_gender_id', // shoe gender id
    'g.gender_name as shoe_inventory_gender_name', // shoe gender name
    'g.created_at as shoe_inventory_gender_created_at', 
    'g.modified_at as shoe_inventory_gender_modified_at', 
    
    // shoes
    'sh_inv.shoe_id', // id
    's.shoe_name', // name
    's.shoe_description', // description
    's.created_at as shoe_created_at',
    's.modified_at as shoe_modified_at',
    
    // colors
    'sh_inv.color_id', // id
    'col.color_name', // name
    'col.color_description', // description
    'col.created_at as color_created_at',
    'col.modified_at as color_modified_at',
    
    // brands
    's.brand_id', // id
    'b.brand_name', // name
    'b.brand_description', // description
    'b.created_at as brand_created_at',
    'b.modified_at as brand_modified_at',

    // shoe_sizes
    'sh_inv.shoe_size_id', // shoe_size_id
    'sh_sizes.shoe_size_amount', // shoe_size_amount
    'sh_sizes.created_at as shoe_size_created_at',
    'sh_sizes.modified_at as shoe_size_modified_at',
    
    'sh_sizes.gender_id as shoe_size_gender_id', 
    'gen.gender_name as shoe_size_gender_name',
    'gen.created_at as shoe_size_gender_created_at',
    'gen.modified_at as shoe_size_gender_modified_at',

    // shoe_styles
    's.shoe_style_id', // id
    'sh_styles.shoe_style_name', // name
    'sh_styles.shoe_style_description', // description
    'sh_styles.created_at as shoe_style_created_at', // created_at
    'sh_styles.modified_at as shoe_style_modified_at', // modified_at
    
    // countries
    'ct.country_id', // id
    'ct.country_name', // name
    'ct.country_name_abreviation', // abreviation
    'ct.created_at as country_created_at',
    'ct.modified_at as country_modified_at',
    
    // images
    'sh_img.image_id', // id
    'img.image_name', // name
    'img.image_src', // src
    'img.image_alt', // alt
    'img.image_title', // title
    'img.created_at as image_created_at',
    'img.modified_at as image_modified_at',
  )
  .where('sh_inv.shoe_inventory_id', shoe_inventory_id);
  
  const shoeInventoryReducer = (acc, curr) => {      
    // shoe_inventory
    acc.shoe_inventory_id = curr.shoe_inventory_id; // id
    acc.quantity = curr.shoe_inventory_quantity; // quantity
    acc.price = curr.shoe_inventory_price; // price
    acc.created_at = curr.shoe_inventory_created_at; // created_at
    acc.modified_at = curr.shoe_inventory_modified_at; // modified_at
    
    // shoe
    acc.shoe.shoe_id = curr.shoe_id; // id
    acc.shoe.name = curr.shoe_name; // name
    acc.shoe.description = curr.shoe_description; // description
    acc.shoe.created_at = curr.shoe_created_at; // created_at
    acc.shoe.modified_at = curr.shoe_modified_at; // modified_at
          
    // shoe_style
    acc.shoe.style.shoe_style_id = curr.shoe_style_id; // id
    acc.shoe.style.name = curr.shoe_style_name; // name
    acc.shoe.style.description = curr.shoe_style_description; // description
    acc.shoe.style.created_at = curr.shoe_style_created_at; // created_at
    acc.shoe.style.modified_at = curr.shoe_style_modified_at; // created_at

    acc.shoe.style.gender.gender_id = curr.shoe_inventory_gender_id;
    acc.shoe.style.gender.name = curr.shoe_inventory_gender_name;
    acc.shoe.style.gender.created_at = curr.shoe_inventory_gender_created_at;
    acc.shoe.style.gender.modified_at = curr.shoe_inventory_gender_modified_at;
    
    // color
    acc.shoe.style.color.color_id = curr.color_id;
    acc.shoe.style.color.name = curr.color_name;
    acc.shoe.style.color.description = curr.color_description;
    acc.shoe.style.color.created_at = curr.color_created_at;
    acc.shoe.style.color.modified_at = curr.color_modified_at;
    
    // shoe_size
    acc.shoe.size.shoe_size_id = curr.shoe_size_id; // id
    acc.shoe.size.amount = curr.shoe_size_amount; // amount
    acc.shoe.size.created_at = curr.shoe_size_created_at; // created_at
    acc.shoe.size.modified_at = curr.shoe_size_modified_at; // modified_at
    
    // shoe_size_country
    acc.shoe.size.country.country_id = curr.country_id; // id
    acc.shoe.size.country.name = curr.country_name; // name
    acc.shoe.size.country.name_abreviation = curr.country_name_abreviation; // country_name_abreviation
    acc.shoe.size.country.created_at = curr.country_created_at; // created_at
    acc.shoe.size.country.modified_at = curr.country_modified_at; // modified_at
    
    // shoe_size_gender
    acc.shoe.size.gender.gender_id = curr.shoe_size_gender_id; // id
    acc.shoe.size.gender.name = curr.shoe_size_gender_name; // name
    acc.shoe.size.gender.created_at = curr.shoe_size_gender_created_at; // created_at
    acc.shoe.size.gender.modified_at = curr.shoe_size_modified_at; // modified_at
    
    // brand_id
    acc.shoe.brand.brand_id = curr.brand_id; // id
    acc.shoe.brand.name = curr.brand_name; // name
    acc.shoe.brand.description = curr.brand_description; // description
    acc.shoe.brand.created_at = curr.brand_created_at; // created_at
    acc.shoe.brand.modified_at = curr.brand_modified_at; // modified_at
    
    curr.image_id && acc.shoe.images.push({
      image_id: curr.image_id,
      name: curr.image_name,
      title: curr.image_title,
      alt: curr.image_alt,
      src: curr.image_src,
      created_at: curr.image_created_at,
      modified_at: curr.image_modified_at
    });

    return acc;
  };

  const model = {
    shoe: {
      brand: {},
      size: { country: {}, gender: {} },
      style: { gender: {}, color: {} },
      images: []
    }
  }
  
  const shoe_inventory_item_model = shoe_inventory.length > 0 
  ? shoe_inventory.reduce(shoeInventoryReducer, model) 
  : null;

  return shoe_inventory_item_model;
};

module.exports = {
  findAll,
  findById
}