const Brand = require('../brands/brand-model');
const Style = require('../shoe_styles/shoe_styles-model');
const Image = require('../images/image-model');
const Shoe = require('../shoes/shoe-model');

const validateNewShoeRequiredFields = async (req, res, next) => {
  const { name, brand, style } = req.body;

  if(!name || !brand.name || !style.name){
    next({
      status: 400,
      message: "shoe missing name, brand.name, or style.name"
    });
  } else {
    next();
  }
}

const handleBrandToUse = async (req, res, next) => {
  const { brand: { name, description } } = req.body;
  try {
    const [ brand ] = await Brand.findBy({ brand_name: name });
    if(brand){
      req.body.brand = brand;
      next();
      
    } else {
      try {
        const newBrand = await Brand.create({ name, description });
        req.body.brand = newBrand;
        next();
      } catch (err) {
        next(err);
      }
    }

  } catch (err) {
    next(err);
  }
}

const handleStyleToUse = async (req, res, next) => {
  const { style: { name, description } } = req.body;
  try {
    const [ style ] = await Style.findBy({ shoe_style_name: name });
    if(style){
      req.body.style = style;
      next();
      
    } else {
    
      try {
        const newStyle = await Style.create({ name, description });
        req.body.style = newStyle;
        next();
    
      } catch (err) {
        next(err);
      }
    }

  } catch (err) {
    next(err);
  }
}

const validateNewShoeInventoryItems = async (req, res, next) => {
  const { models } = req.body;
  if(models && Array.isArray(models) && models.length > 0){
  
    models.forEach(model => {
      if(!model.color.color_id || !model.size.shoe_size_id || !model.gender.gender_id){
        next({
          status: 400,
          message: `model missing color_id, shoe_size_id, or gender_id`
        });
      }
      
      model.images && model.images.length > 0 && model.images.forEach(async image => {
        if(!image.name||!image.title||!image.src||!image.alt){
          next({
            status: 400,
            message: `model image missing name, title, src, or image`
          });
        } else {
          try {
            const [ imageNameDuplicate ] = await Image.findBy({ image_name: image.name });

            if(imageNameDuplicate){
              next({
                status: 400,
                message: `image name '${imageNameDuplicate}' is taken`
              })
            }

          } catch(err) {
            next(err);
          }
        }
      });

      
    });

    next();

  } else {
    next();
  }

}

const validateShoeNameUnique = async (req, res, next) => {
  const { name } = req.body;
  try {
    const [shoe] = await Shoe.findBy({ shoe_name: name });
    if(shoe){
      next({ 
        status: 400,
        message: `shoe name is taken`
      })
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validateNewShoeRequiredFields,
  handleBrandToUse,
  handleStyleToUse,
  validateNewShoeInventoryItems,
  validateShoeNameUnique
}