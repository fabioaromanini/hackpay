const passport = require('passport');
const userService = require('../services/userService');

module.exports = app => {
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
    await userService.updateToken(phoneNumber, token);
    res.send({ token });
  });
};
