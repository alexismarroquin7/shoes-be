const router = require('express').Router();

const brandRouter = require('./brands/brand-router');
const countryRouter = require('./countries/country-router');
const shoeInventoryRouter = require('./shoe_inventory/shoe_inventory-router');

router.use('/brands', brandRouter);
router.use('/countries', countryRouter);
router.use('/shoe_inventory', shoeInventoryRouter);

module.exports = router;