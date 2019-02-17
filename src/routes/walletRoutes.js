const paymentService = require('../services/paymentService');

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
      await paymentService.cashIn(user, amount);
      res.send('ok');
    } catch (e) {
      res.status(403).send();
    }
  });
};
