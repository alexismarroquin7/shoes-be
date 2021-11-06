const Country = require('./country-model');

const validateCountryExistsById = async (req, res, next) => {
  try {
    const country = await Country.findById(Number(req.params.country_id));
    if(country){
      req.country = country;
      next();
    } else {
      next({
        status: 404,
        message: `country of id ${req.params.country_id} does not exist`
      });
    }
  } catch (err) {
    next(err);
  }
}

const validateCountryNameUnique = async (req, res, next) => {
  try {
    const [country] = await Country.findBy({ country_name: req.body.name });
    if(country){
      next({
        status: 400,
        message: `there is already a country named '${req.body.name}'`
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

const validateCountryAbreviationUnique = async (req, res, next) => {
  try {
    const [country] = await Country.findBy({ country_name_abreviation: req.body.abreviation });
    if(country){
      next({
        status: 400,
        message: `there is already a country (${country.name}) abreviated as '${req.body.abreviation}'`
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

const validateCountryModel = (req, res, next) => {
  const { name, abreviation } = req.body;
  if(
    !name ||
    !abreviation
  ){
    next({
      status: 400,
      message: `country is missing {name} or {abreviation}`
    });
  } else {
    next();
  }
}

module.exports = {
  validateCountryExistsById,
  validateCountryNameUnique,
  validateCountryAbreviationUnique,
  validateCountryModel
}