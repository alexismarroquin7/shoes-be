const router = require('express').Router();
const Color = require('./colors-model');


router.get('/', async (req, res, next) => {
  try {
    const colors = await Color.findAll();
    res.status(200).json(colors);
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