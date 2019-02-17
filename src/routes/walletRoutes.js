const paymentRepository = require('../repositories/zoopRepository');

const HACK_PAY_ID =
  process.env.HACK_PAY_ID || 'd9adc3c224d54b648f13fe6c431cf1fd';

module.exports = app => {
  app.post('/wallet/transfer', async (req, res) => {
    const user = req.user || {
      id: '00594a5c10e240988a0e6e2842f067bf',
      cashback: 0.005,
      fee: 0.03,
    };
    const destiny = req.body.destiny || {
      id: 'b61e502149194f7aa5550713b96d6d89',
    };
    const amount = parseInt(req.body.amount || '5000');

    await paymentRepository.transactionP2P(amount, 'BUY', user.id, destiny.id);
    await paymentRepository.transactionP2P(
      amount * (user.fee + user.cashback),
      'FEE + CASHBACK',
      destiny.id,
      HACK_PAY_ID
    );
    await paymentRepository.transactionP2P(
      amount * user.cashback,
      'CASHBACK',
      HACK_PAY_ID,
      user.id
    );
    res.send('');
  });
};
