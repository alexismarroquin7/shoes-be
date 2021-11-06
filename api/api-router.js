const router = require('express').Router();

const brandRouter = require('./brands/brand-router');

router.use('/brands', brandRouter);

module.exports = router;