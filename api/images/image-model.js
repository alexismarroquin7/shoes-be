const db = require('../data/db-config');

const findByNameList = async (imageNameList) => {
  const rows = await db('images as img')
  .where(builder => {
    builder.whereIn('i.image_name', imageNameList);
  });

  if(rows && Array.isArray(rows) && rows.length > 0){
    const images = rows.map(image => {
      return {
        image_id: image.image_id,
        image_name: image.image_name,
        image_alt: image.image_alt,
        image_src: image.image_src,
        image_title: image.image_title,
        created_at: image.created_at,
        modified_at: image.modified_at
      }
    })
    return images;
  } else {
    return null;
  }
}

const findBy = async (filter) => {
  const rows = await db('images as img')
  .where(filter)
  .select(
    'img.image_id',
    'img.image_title as title',
    'img.image_alt as alt',
    'img.image_src as src',
    'img.image_name as name',
    'img.created_at',
    'img.modified_at'
  )
  return rows;
} 

module.exports = {
  findByNameList,
  findBy
}