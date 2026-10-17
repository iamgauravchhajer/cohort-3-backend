const express = require('express');
const router = express.Router();
const passport = require('../config/passport.config');
const { requireAuth } = require('../middlewares/auth.middleware');
const { handleGoogleCallback, getMe, logout, } = require('../controllers/auth.controller');
const ENV = require('../config/env.config');


router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
    session: false,
  })
); 
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${ENV.CLIENT_URL}/?error=google_auth_failed`,
  }),
  handleGoogleCallback
);
router.get('/me', requireAuth, getMe);
router.post('/logout', logout);

module.exports = router;
