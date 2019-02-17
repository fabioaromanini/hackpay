const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userService = require('../services/userService');

const moment = require('moment');

const isOldToken = tokenDateString => {
  const tokenDate = moment(tokenDateString);
  const now = new Date();

  // gets difference in minutes
  return tokenDate.diff(now, 'm') < -20;
};

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

        if (!user) {
          return cb(null, false, {
            status: 403,
            message: {
              email: 'User not found',
            },
          });
        }

        if (user.token !== token) {
          return cb(null, false, {
            status: 403,
            message: {
              password: 'Invalid password',
            },
          });
        }

        if (isOldToken(user.updatedAt)) {
          return cb(null, false, {
            status: 403,
            message: {
              password: 'Expired token',
            },
          });
        }

        return cb(null, user);
      }
    )
  );
};
