const uuid = require('uuid/v1');

const createToken = () => {
  const fullToken = uuid();
  const tokenSize = fullToken.indexOf('-');
  return fullToken.substring(0, tokenSize);
};

const getUser = async phoneNumber => {
  const { Item: user } = await userRepository.getUser(phoneNumber);
  return user;
};

module.exports = {
  createToken,
  getUser,
};
