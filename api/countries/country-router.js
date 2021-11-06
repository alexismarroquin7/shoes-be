const router = require('express').Router();
const Country = require('./country-model');
const { 
  validateCountryExistsById,
  validateCountryModel,
  validateCountryNameUnique,
  validateCountryAbreviationUnique
} = require('./country-middleware');

router.get('/', async (req, res, next) => {
  try {
    const countries = await Country.findAll();
    res.status(200).json(countries);
  } catch (err) {
    next();
  }
});

router.get('/:country_id', validateCountryExistsById, (req, res) => {
  res.status(200).json(req.country);
});

router.post(
  '/',
  validateCountryModel,
  validateCountryNameUnique,
  validateCountryAbreviationUnique,
  async (req, res, next) => {
  try {
    const country = await Country.create(req.body);
    res.status(201).json(country);
  } catch (err) {
    next(err);
  }
});

router.put(
  '/:country_id',
  validateCountryExistsById,
  validateCountryModel,
  validateCountryNameUnique,
  validateCountryAbreviationUnique,
  async (req, res, next) => {
    try {
      const country = await Country.updateById(req.body, req.country.country_id);
      res.status(201).json(country);
    } catch (err) {
      next(err);
    }
});

router.delete('/:country_id', (req, res, next) => {//eslint-disable-line
  res.end();
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status||500).json({ message: err.message, stack: err.stack });
});

module.exports = router;