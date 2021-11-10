const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function generateJsonWebToken(user){
  const { user_id, username, role } = user;
  
  const payload = {
    subject: user_id,
    username: username,
    role: {
      name: role.name
    }
  };

  const options = {
    expiresIn: '1d'
  };

  const token = jwt.sign(payload, JWT_SECRET, options);
  
  return token;
}

module.exports = {
  generateJsonWebToken
}