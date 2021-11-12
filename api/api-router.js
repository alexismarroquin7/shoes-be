const router = require('express').Router();

const authRouter = require('./auth/auth-router');
const brandRouter = require('./brands/brand-router');
const countryRouter = require('./countries/country-router');
const shoeInventoryRouter = require('./shoe_inventory/shoe_inventory-router');
const shoeRouter = require('./shoes/shoe-router');
const userRouter = require('./users/user-router');
const shoeStyleRouter = require('./shoe_styles/shoe_styles-router');

router.use('/auth', authRouter);
router.use('/brands', brandRouter);
router.use('/countries', countryRouter);
router.use('/shoe_inventory', shoeInventoryRouter);
router.use('/shoes', shoeRouter);
router.use('/users', userRouter);
router.use('/shoe_styles', shoeStyleRouter);

module.exports = router;