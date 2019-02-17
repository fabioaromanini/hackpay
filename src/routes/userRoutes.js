const passport = require('passport');
const userService = require('../services/userService');
const notificationService = require('../services/notificationService');

module.exports = app => {
  app.post('/users/new', async (req, res) => {
    try {
      const user = req.body;
      if (userService.validateUserForSignup(user)) {
        return res.status(403).send('Invalid user');
      }
    } catch (e) {
      res.status(500).send('Internal Error');
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
