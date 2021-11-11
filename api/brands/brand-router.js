const router = require('express').Router();
const Brand = require('./brand-model');
const { validateBrandExistsById, validateBrandNameUnique } = require('./brand-middleware');

router.get('/', async (req, res, next) => {
  try {
    const brands = await Brand.findAll();
    res.status(200).json(brands);
  } catch(err) {
    next(err);
  }
});

router.get('/:brand_id', validateBrandExistsById, (req, res) => {
  res.status(200).json(req.brand);
});

router.post('/', validateBrandNameUnique, async (req, res, next) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(201).json(brand);
  } catch (err) {
    next(err);
  }
});

router.put('/:brand_id', validateBrandExistsById, validateBrandNameUnique, async (req, res, next) => {
  try {
    const brand = await Brand.updateById(req.body, req.brand.brand_id);
    res.status(200).json(brand);
  } catch (err) {
    next(err);
  }
});

router.delete('/:brand_id', validateBrandExistsById, async (req, res, next) => {
  try {
    const deletedBrand = await Brand.deleteById(req.brand.brand_id);
    res.status(200).json({
      brand_id: deletedBrand.brand_id
    });

  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;