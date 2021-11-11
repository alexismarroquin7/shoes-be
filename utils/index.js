const { generateJsonWebToken, generateJsonWebTokenForUser } = require('./generate-json-web-token');
const { sendMail } = require('./send-mail');

const intToBool = num => num === 0 ? false : true;
const boolToInt = bool => bool === true ? 1 : 0;

module.exports = {
  generateJsonWebToken,
  generateJsonWebTokenForUser,
  intToBool,
  boolToInt,
  sendMail
}