const router = require('express').Router();
const ShoeStyle = require('./shoe_styles-model');


router.get('/', async (req, res, next) => {
  try {
    const shoe_styles = await ShoeStyle.findAll();
    res.status(200).json(shoe_styles);
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