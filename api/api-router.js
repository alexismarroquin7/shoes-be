const router = require('express').Router();

const brandRouter = require('./brands/brand-router');
const countryRouter = require('./countries/country-router');

router.use('/brands', brandRouter);
router.use('/countries', countryRouter);

module.exports = router;