const router = require('express').Router();

router.get('/', async (req, res, next) => {
  res.end();
});

router.get('/:user_id', async (req, res, next) => {
  res.end();
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;