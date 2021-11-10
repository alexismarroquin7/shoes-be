const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function generateJsonWebToken(user){
  const { user_id } = user;
  
  const payload = {
    subject: user_id,
    username: user.username,
    email: user.email,
    email_confirmed: user.email_confirmed,
    role: { role_id: user.role.id, name: user.role.name }
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