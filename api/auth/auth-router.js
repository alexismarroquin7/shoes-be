const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../utils');

router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;

  const rounds = process.env.DB_ROUNDS 
    ? Number(process.env.DB_ROUNDS) 
    : 8;

  const hash = bcrypt.hashSync(password, rounds);

  try {
    // const user = await User.create({ username, password: hash });
    res.status(201).json(user);
  } catch(err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  
  // const [ user ] = await User.findBy({ username: username });
  
  if(bcrypt.compareSync(password, user.password)){
    req.session.user = user;
    const token = generateToken(user);

    res.status(200).json({
      message: `Welcome back ${user.username}`,
      user_id: user.user_id,
      username: user.username,
      role_name: user.role_name,
      token
    });
  } else {
    next({ status: 401, message: 'Invalid credentials' });
  }
});

router.get('/logout', (req, res, next) => {
  if(req.session.user){
    req.session.destroy((err => {
      if(err){
        next({ message: 'session was not destroyed'});
      } else {
        res.status(200).json({ message: `logged out` });
      }
    }))
  } else {
    next({ status: 200, message: 'no session' });
  }
});

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack
  })
});

module.exports = router;