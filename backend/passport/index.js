const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  // for memory efficiency
  // save only user id to session
  passport.serializeUser((user, done) => {
    done(null, user.id); // save user id to session
    // done(null, user); // save user to session
  });

  // for memory efficiency
  // user recovery with user id
  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then(user => done(null, user)) // save user to req.user and req.isAuthenticated() is Available
      .catch(error => done(error));
  });

  local();
  kakao();
};
