const router = require('express').Router();
const ShoeSize = require('./shoe_sizes-model');


router.get('/', async (req, res, next) => {
  try {
    const shoeSizes = await ShoeSize.findAll();
    res.status(200).json(shoeSizes);
  } catch (err) {
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