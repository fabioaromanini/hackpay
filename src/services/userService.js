const uuid = require('uuid/v1');
const { validateBr, maskBr } = require('js-brasil');

const createToken = () => {
  const fullToken = uuid();
  const tokenSize = fullToken.indexOf('-');
  return fullToken.substring(0, tokenSize);
};

const getUser = async phoneNumber => {
  const { Item: user } = await userRepository.getUser(phoneNumber);
  return user;
};

const validateUserForSignup = user => {
  const maskedCpf = maskBr.cpf(user.cpf);
  return validateBr.cpf(maskedCpf);
};

module.exports = {
  createToken,
  getUser,
  validateUserForSignup,
};
