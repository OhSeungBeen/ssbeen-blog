const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');
const router = express.Router();

// sign up
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { nickname, email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return;
    }
    const hashPassword = await bcrypt.hash(password, 12); // 12 = complexity
    await User.create({
      nickname,
      email,
      hashPassword,
    });
    return;
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', (req, res, next) => {
  // go to passport.use() (passport/localStrategy.js)
  passport.authenticate('local', (authError, user, info) => {
    // callback executed when done is called

    // login fail
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginErorr=${info.message}`);
    }

    // login success
    // req.login => go to passport.serializeUser() (passport/index.js)
    return req.login(user, loginErorr => {
      if (loginError) {
        console.error(loginErorr);
        return next(loginErorr);
      }
      // send session cookie to browser
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout(); // remove session cookie
  req.session.destroy();
  res.redirect('/');
});

// go to passport.use() (passport/kakaoStrategy.js)
router.get('/kakao', passport.authenticate('kakao'));

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  },
);

module.exports = router;
