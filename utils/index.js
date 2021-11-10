const { generateJsonWebToken } = require('./generate-json-web-token');

const intToBool = num => num === 0 ? false : true;
const boolToInt = bool => bool === true ? 1 : 0;

module.exports = {
  generateJsonWebToken,
  intToBool,
  boolToInt
}