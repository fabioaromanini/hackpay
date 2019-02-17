const paymentService = require('../services/paymentService');

const { HACK_PAY_ID } = process.env;

module.exports = app => {
  app.post('/wallet/transfer', async (req, res) => {
    const user = req.user;
    const { destiny, amount } = req.body;
    const intAmount = parseInt(amount);

    await paymentService.transferAndCashback(user, destiny, intAmount);
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
