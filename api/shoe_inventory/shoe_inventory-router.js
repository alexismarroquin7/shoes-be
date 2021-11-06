const router = require('express').Router();
const ShoeInventory = require('./shoe_inventory-model');
const { validateShoeInventoryExistsById } = require('./shoe_inventory-middleware');

router.get('/', async (req, res, next) => {
  try {
    const shoe_inventory = await ShoeInventory.findAll();
    res.status(200).json(shoe_inventory);
  } catch (err) {
    next(err);
  }
});

router.get('/:shoe_inventory_id', validateShoeInventoryExistsById, (req, res) => {
  res.status(200).json(req.shoe_inventory);
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status||500).json({ message: err.message, stack: err.stack });
});

module.exports = router;