const jwt = require('jsonwebtoken');
const ENV = require('../config/env.config');

const handleGoogleCallback = (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${ENV.CLIENT_URL}/?error=google_auth_failed`);
    }

    // Sign JWT payload with user ID
    const token = jwt.sign({ id: req.user._id }, ENV.JWT_SECRET, {
      expiresIn: '7d',
    });

    // Store JWT in secure httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to home/dashboard
    return res.redirect(`${ENV.CLIENT_URL}/?login=success`);
  } catch (error) {
    console.error('Error in handleGoogleCallback:', error);
    return res.redirect(`${ENV.CLIENT_URL}/?error=server_error`);
  }
};

const getMe = (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: ENV.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

module.exports = { handleGoogleCallback, getMe, logout };
