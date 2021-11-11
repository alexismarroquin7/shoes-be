const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../users/user-model');
const { JWT_SECRET } = require('../../config');
const { generateJsonWebTokenForUser } = require('../../utils');

const validateLoginCredentials = async (req, res, next) => {
  const { email, password } = req.body;
  if(!email || !password){
    next({
      status: 400,
      message: `email and password are required to login`
    });
  } else {
    const [ user ] = await User.findBy({ email });
    if(user){
      if(user.email_confirmed){
        const valid = bcrypt.compareSync(password, user.password);
        if(valid){
          req.user = user;
          next();
        } else {
          next({ status: 401, message: 'invalid credentials' });
        }
      } else {
        next({ status: 400, message: 'email has not been confirmed' });
      }
    } else {
      next({ status: 404, message: 'user was not found' });
    }
  }
};

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  
  if(!token){
    res.status(401).json({ message: 'token required' });
  
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if(err){
        res.status(401).json({ message: 'token invalid' });
      } else {
        req.decodedToken = decoded;
        next();
      }
    });
  }
}

const handleJsonWebTokenForUser = (req, res, next) => {
  try {
    const token = generateJsonWebTokenForUser(req.user);
    req.token = token;
    next();
  } catch (err) {
    next(err);
  }
};

const handlePasswordHash = (req, res, next) => {
  const { password } = req.body;
  try {
    const rounds = Number(process.env.HASH_ROUNDS) || 8;
    const hash = bcrypt.hashSync(password, rounds);
    if(hash){
      req.hash = hash;
      next();
    } else {
      next({ status: 500, message: "an error occured while hashing password" })
    }
  } catch (err) {
    next(err);
  }
}

const validateConfirmEmailToken = (req, res, next) => {
  if(!req.params.token){
    res.status(401).json({ message: 'token required' });
  
  } else {
    jwt.verify(req.params.token, JWT_SECRET, (err, decoded) => {
      if(err){
        res.status(401).json({ message: 'token invalid' });
      } else {
        req.decodedConfirmEmailToken = decoded;
        next();
      }
    });
  }
};

module.exports = {
  validateLoginCredentials,
  restricted,
  handleJsonWebTokenForUser,
  handlePasswordHash,
  validateConfirmEmailToken
}