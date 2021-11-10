const router = require('express').Router();
const { validateUserExistsById } = require('./user-middleware');
const User = require('./user-model');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:user_id', validateUserExistsById, async (req, res) => {
  res.status(200).json(req.user);
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;