const paymentRepository = require('../repositories/zoopRepository');

const createPayer = async user => {
  const names = user.name.split(' ');
  const firstName = names[0];
  const lastName = names
    .slice(1)
    .reverse()
    .reduce((name, fullLastName) => (fullLastName += ` ${name}`), ' ');

  const data = await paymentRepository.createUser(
    firstName,
    lastName,
    user.cpf,
    user.phoneNumber,
    user.email
  );

  return {
    id: data.id,
    ...user,
  };
};

module.exports = {
  createPayer,
};
