const paymentRepository = require('../repositories/zoopRepository');

const { HACK_PAY_ID } = process.env;

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

const associateCardToken = async (user, cardToken) => {
  try {
    const id = user.id;
    await paymentRepository.cardAssociate(id, cardToken);
  } catch (e) {
    throw e;
  }
};

const getBalance = async user => {
  const response = await paymentRepository.getBalance(user.id);
  return response.items.current_balance;
};

const transferAndCashback = async (sourceUser, destinyUser, amount) => {
  // in order to achieve the fee payment, and cash-back, first we transfer
  // money to the seller, then we transfer the cashback and fee from the seller to
  // our platform, then finally we transfer the cashback to the user
  await paymentRepository.transactionP2P(
    amount,
    'BUY',
    sourceUser.id,
    destinyUser.id
  );

  await paymentRepository.transactionP2P(
    amount * (sourceUser.fee + sourceUser.cashback),
    'FEE + CASHBACK',
    destinyUser.id,
    HACK_PAY_ID
  );

  await paymentRepository.transactionP2P(
    amount * sourceUser.cashback,
    'CASHBACK',
    HACK_PAY_ID,
    sourceUser.id
  );
};

const cashIn = async (user, amount) => {
  await paymentRepository.preAuthCreditCard(
    amount,
    'CASH IN',
    HACK_PAY_ID,
    user.id
  );

  await paymentRepository.transactionP2P(
    amount,
    'CASH_IN',
    HACK_PAY_ID,
    user.id
  );
};

module.exports = {
  createPayer,
  getBalance,
  associateCardToken,
  transferAndCashback,
  cashIn,
};
