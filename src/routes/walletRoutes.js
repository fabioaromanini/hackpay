const paymentRepository = require('../repositories/zoopRepository');

const HACK_PAY_ID =
  process.env.HACK_PAY_ID || 'd9adc3c224d54b648f13fe6c431cf1fd';

module.exports = app => {
  app.post('/wallet/transfer', async (req, res) => {
    const user = req.user || { id: 'd9adc3c224d54b648f13fe6c431cf1fd' };
    const destiny = req.body.destiny || {
      id: '00594a5c10e240988a0e6e2842f067bf',
    };
    const amount = parseInt(req.body.amount || '100');

    await paymentRepository.transactionP2P(amount, 'BUY', user.id, destiny.id);
    await paymentRepository.transactionP2P(
      amount * (fee + cashback),
      'FEE + CASHBACK',
      destiny.id,
      HACK_PAY_ID
    );
    await paymentRepository.transactionP2P(
      amount * cashback,
      'CASHBACK',
      HACK_PAY_ID,
      user.id
    );
  });
};
