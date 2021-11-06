const db = require('../data/db-config');

const findAll = async () => {
  const shoe_inventory = await db('shoe_inventory as sh_inv')
  .join('shoes as s', 's.shoe_id', 'sh_inv.shoe_id')
  .join('brands as b', 'b.brand_id', 's.brand_id')
  .join('colors as col', 'col.color_id', 'sh_inv.color_id')
  .join('shoe_sizes as sh_sizes', 'sh_sizes.shoe_size_id', 'sh_inv.shoe_size_id')
  .join('shoe_styles as sh_styles', 'sh_styles.shoe_style_id', 's.shoe_style_id')
  .join('countries as ct', 'ct.country_id', 'sh_sizes.country_id')
  .join('shoe_images as sh_img', 'sh_img.shoe_inventory_id', 'sh_inv.shoe_inventory_id') // check if works when shoe has not images
  .join('images as img', 'img.image_id', 'sh_img.image_id') // check if works when shoe has not images
  // .join 'genders'

  return shoe_inventory;
}

module.exports = {
  findAll
}