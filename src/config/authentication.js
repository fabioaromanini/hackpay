const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userService = require('../services/userService');

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, cb) => {
    cb(null, user.phoneNumber);
  });

  passport.deserializeUser(async (phoneNumber, callback) => {
    try {
      const user = await userService.getUser(phoneNumber);
      callback(null, user);
    } catch (e) {
      callback(e);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'phoneNumber',
        passwordField: 'token',
      },
      async (phoneNumber, token, cb) => {
        const user = await userService.getUser(phoneNumber);

        if (user === null) {
          return cb(null, false, {
            status: 403,
            message: {
              email: 'User not found',
            },
          });
        } else if (user.token !== token) {
          return cb(null, false, {
            status: 403,
            message: {
              password: 'Invalid password',
            },
          });
        }

        return cb(null, user);
      }
    )
  );
};
