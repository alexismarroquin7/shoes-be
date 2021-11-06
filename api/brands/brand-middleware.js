const Brand = require('./brand-model');

const validateBrandExistsById = async (req, res, next) => {
  const { brand_id } = req.params;
  try {
    const brand = await Brand.findById(Number(brand_id));
    if(brand){
      req.brand = brand;
      next();
      
    } else {
      next({
        status: 404,
        message: `brand of id ${brand_id} does not exist`
      });
    }
  } catch(err) {
    next(err);
  }
}

const validateBrandNameUnique = async (req, res, next) => {
  const { name } = req.body;
  try {
    if(!name){
      next({
        status: 400,
        message: "brand missing {name} attribute"
      });

    } else {
      const [ brand ] = await Brand.findBy({ brand_name: name });
      if(brand){
        next({
          status: 400,
          message: `there is already a brand named '${name}'`
        });
      } else {
        next();
      }
    }

  } catch(err) {
    next(err);
  }
};

module.exports = {
  validateBrandExistsById,
  validateBrandNameUnique
}