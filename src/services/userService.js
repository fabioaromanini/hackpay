const uuid = require('uuid/v1');
const { validateBr, maskBr } = require('js-brasil');
const userRepository = require('../repositories/userRepository');

const createToken = () => {
  const fullToken = uuid();
  const tokenSize = fullToken.indexOf('-');
  return fullToken.substring(0, tokenSize);
};

const getUser = async phoneNumber => {
  const { Item: user } = await userRepository.getUser(phoneNumber);
  return user;
};

const validateUserCPF = user => {
  const maskedCpf = maskBr.cpf(user.cpf);
  const isValidCpf = validateBr.cpf(maskedCpf);
  return isValidCpf;
};

const validateUserPhoneNumber = async user => {
  const existingUserWithSamePhoneNumber = await getUser(user.phoneNumber);
  return !existingUserWithSamePhoneNumber;
};

const updateToken = async (phoneNumber, token) => {
  await userRepository.updateToken(phoneNumber, token);
};

const persistUser = async user => {
  await userRepository.persistUser(user);
};

module.exports = {
  validateUserPhoneNumber,
  createToken,
  getUser,
  validateUserCPF,
  updateToken,
  persistUser,
};
