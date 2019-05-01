const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../model/user");

passport.use(
  new LocalStrategy(async function(username, password, done) {
    try {
      const user = await UserModel.findOne({ username });
      if (!user) return done(null, false);

      const isPassword = await user.isValidPassword(password);
      if (!isPassword) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const company = await UserModel.findById(id);
    done(null, company);
  } catch (err) {
    done(err);
  }
});
