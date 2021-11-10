const router = require('express').Router();
const User = require('../users/user-model');
const {
  validateLoginCredentials,
  handleJsonWebToken,
  handlePasswordHash 
} = require('./auth-middleware');
const {
  validateNewUserModel,
  validateEmailUnique 
} = require('../users/user-middleware');

router.post('/register', validateNewUserModel, validateEmailUnique, handlePasswordHash, async (req, res, next) => {
  const { username, email, role } = req.body;
  try {
    const user = await User.create({ username, email, role, password: req.hash });
    res.status(201).json(user);
  } catch(err) {
    next(err);
  }
});

router.post('/login', validateLoginCredentials, handleJsonWebToken, async (req, res, next) => {
  res.status(200).json({
    message: `welcome back ${req.user.username}`,
    user: req.user,
    token: req.token
  });
});

router.get('/logout', (req, res, next) => {
  res.end();
});

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;