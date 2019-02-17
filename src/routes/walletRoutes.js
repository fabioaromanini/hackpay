const paymentRepository = require('../repositories/zoopRepository');

const { HACK_PAY_ID } = process.env;

module.exports = app => {
  app.post('/wallet/transfer', async (req, res) => {
    const user = req.user;
    const { destiny, amount } = req.body;
    const intAmount = parseInt(amount);

    // in order to achieve the fee payment, and cash-back, first we transfer
    // money to the seller, then we transfer the cashback and fee from the seller to
    // our platform, then finally we transfer the cashback to the user
    await paymentRepository.transactionP2P(
      intAmount,
      'BUY',
      user.id,
      destiny.id
    );

    await paymentRepository.transactionP2P(
      intAmount * (user.fee + user.cashback),
      'FEE + CASHBACK',
      destiny.id,
      HACK_PAY_ID
    );

    await paymentRepository.transactionP2P(
      intAmount * user.cashback,
      'CASHBACK',
      HACK_PAY_ID,
      user.id
    );

    res.send('');
  });

  app.post('/wallet/deposit', async (req, res) => {
    const user = req.user;
    const amount = parseInt(req.body.amount);

    try {
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

      res.send('ok');
    } catch (e) {
      res.status(403).send();
    }
  });
};
