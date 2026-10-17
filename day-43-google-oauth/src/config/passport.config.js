const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require('../models/user.model');
const ENV = require('./env.config');

passport.use(
  new GoogleStrategy(
    {
      clientID: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
      callbackURL: ENV.GOOGLE_CALLBACK_URL,
      proxy: true,
    },
    // Runs AFTER Passport exchanged the code and fetched the profile from Google
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 1. Look up by Google ID (stable unique identifier)
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user); // Returning user -> Login
        }

        // 2. Account linking: Check if an account already exists with the same verified email
        const email = profile.emails?.[0]?.value;
        const emailVerified = profile._json?.email_verified;

        if (email && emailVerified) {
          user = await User.findOne({ email });
          if (user) {
            user.googleId = profile.id;
            if (!user.avatar && profile.photos?.[0]?.value) {
              user.avatar = profile.photos[0].value;
            }
            await user.save();
            return done(null, user); // Account linked -> Login
          }
        }

        // 3. New user -> Register
        user = await User.create({
          googleId: profile.id,
          email: email,
          name: profile.displayName,
          avatar: profile.photos?.[0]?.value,
        });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
