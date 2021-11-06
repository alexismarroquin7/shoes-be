const router = require('express').Router();
const ShoeInventory = require('./shoe_inventory-model');

router.get('/', async (req, res, next) => {
  try {
    const shoe_inventory = await ShoeInventory.findAll();
    res.status(200).json(shoe_inventory);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {//eslint-disable-line
  res.status(err.status||500).json({ message: err.message, stack: err.stack });
});

module.exports = router;