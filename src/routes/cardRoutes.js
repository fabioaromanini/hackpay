const paymentRepository = require('../repositories/zoopRepository');

const HACK_PAY_ID =
  process.env.HACK_PAY_ID || 'd9adc3c224d54b648f13fe6c431cf1fd';

module.exports = app => {
  app.post('/card/cash', async (req, res) => {
    const user = req.user || { id: '00594a5c10e240988a0e6e2842f067bf' };
    const amount = parseInt(req.body.amount || '100');

    try {
      const transactionId = await paymentRepository.preAuthCreditCard(
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
