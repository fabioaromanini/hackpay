const paymentRepository = require('../repositories/zoopRepository');

const names = 'joao da silva sauro'.split(' ');
const firstName = names[0];
const lastName = names
  .slice(1)
  .reduce((name, fullLastName) => (fullLastName += ` ${name}`), ' ');

console.log(firstName);
console.log(lastName);
const createPayer = user => {
  const names = user.name.split(' ');
  const firstName = names[0];
  const lastName = names
    .slice(1)
    .reduce((name, fullLastName) => (fullLastName += ` ${name}`), ' ');

  paymentRepository.createUser(firstName, lastName);
};

module.exports = {
  createPayer,
};
