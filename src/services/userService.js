const uuid = require('uuid/v1');

const createToken = () => {
  const fullToken = uuid();
  const tokenSize = fullToken.indexOf('-');
  return fullToken.substring(0, tokenSize);
};

module.exports = {
  createToken,
};
