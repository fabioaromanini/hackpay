const passport = require('passport');
const userService = require('../services/userService');
const notificationService = require('../services/notificationService');
const paymentService = require('../services/paymentService');

module.exports = app => {
  app.post('/users/new', async (req, res) => {
    try {
      const user = req.body;
      const validCpf = userService.validateUserCPF(user);
      const validPhoneNumber = await userService.validateUserPhoneNumber(user);
      if (!validPhoneNumber || !validCpf) {
        return res.status(403).send('Invalid user');
      }
      const userPayer = await paymentService.createPayer(user);
      await userService.persistUser(userPayer);
      res.send(userPayer);
    } catch (e) {
      res.status(500).send('Internal Error');
    }
  });

  app.get('/users/balance', async (req, res) => {
    const { user } = req;
    const balance = await paymentService.getBalance(user.id);
    res.send(balance);
  });

  app.post('/users/card', async (req, res) => {
    const { cardToken } = req.body;
    const { user } = req;
    try {
      await paymentService.associateCardToken(user, cardToken);
      res.send('ok');
    } catch (e) {
      res.status(406).send();
    }
  });

  app.post('/users/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return res.status(500).send({
          status: 500,
          message: 'Internal Error. Try again later',
        });
      }

      if (!user) {
        return res.status(403).send(info);
      }

      req.logIn(user, function(err) {
        if (err) {
          return res.status(500).send({
            status: 500,
            message: 'Internal Error. Try again later',
          });
        }
        return res.send(user);
      });
    })(req, res, next);
  });

  app.post('/users/generateToken', async (req, res) => {
    const { phoneNumber } = req.body;
    const user = await userService.getUser(phoneNumber);

    if (!user) {
      return res.status(403).send({ message: 'User not found!' });
    }

    const token = userService.createToken();
    await Promise.all([
      userService.updateToken(phoneNumber, token),
      notificationService.sendTokenNotification(phoneNumber, token),
    ]);
    res.send();
  });
};
