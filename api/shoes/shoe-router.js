const router = require('express').Router();
const Shoe = require('./shoe-model');

router.get('/', async (req, res, next) => {
  try {
    const shoes = await Shoe.findAll();
    res.status(200).json(shoes);
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