const router = require('express').Router();
const Shoe = require('./shoe-model');
const { validateNewShoeInventoryItems, validateNewShoeRequiredFields, handleStyleToUse, handleBrandToUse, validateShoeNameUnique } = require('./shoe-middleware');

router.get('/', async (req, res, next) => {
  try {
    const shoes = await Shoe.findAll();
    res.status(200).json(shoes);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/', 
  validateNewShoeRequiredFields,
  validateShoeNameUnique,
  validateNewShoeInventoryItems,
  handleBrandToUse,
  handleStyleToUse,
  async (req, res, next) => {
    try {
      const shoe = await Shoe.create(req.body);
      res.status(201).json(shoe);
    } catch(err) {
      next(err);
    } 
  
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack 
  });
});

module.exports = router;