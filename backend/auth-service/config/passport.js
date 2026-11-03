const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("./env");

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${config.AUTH_PORT}/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails?.[0]?.value,
        };
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializzazione dell'utente:", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("Deserializzazione dell'utente:", user);
  done(null, user);
});

module.exports = passport;