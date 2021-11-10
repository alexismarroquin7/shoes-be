const router = require('express').Router();
// const bcrypt = require('bcryptjs');
const { validateLoginCredentials , handleJsonWebToken } = require('./auth-middleware');

router.post('/register', async (req, res, next) => {
  // const { username, password } = req.body;

  // const rounds = process.env.DB_ROUNDS 
  // ? Number(process.env.DB_ROUNDS) 
  // : 8;

  // const hash = bcrypt.hashSync(password, rounds);

  // try {
  //   const user = await User.create({ username, password: hash });
  //   res.status(201).json(user);
  // } catch(err) {
  //   next(err);
  // }
  res.end();
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