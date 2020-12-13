const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // req.body.email
        passwordField: 'password', // req.body.password
      },
      // done(server error, login user, login fail message)
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } });
          if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
              done(null, user);
            } else {
              done(null, false, { message: '비밀번호가 올바르지 않습니다.' });
            }
          } else {
            done(null, false, { message: '이메일 형식이 올바르지 않습니다.' });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};
