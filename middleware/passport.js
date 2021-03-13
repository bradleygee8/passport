const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controllers/userController");
const GitHubStrategy = require('passport-github').Strategy
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

const GithubLogin = new GitHubStrategy({
  clientID: "a4380dc72138023b6e26",
  clientSecret: "9af758d4d28e3e3d7f2e3fdb2b6cd9affa66a597",
  callbackURL: "http://localhost:8000/auth/github/callback"},
  function(accessToken, refreshToken, profile, cb) {
      return cb(err, user);
    });


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin), passport.use(GithubLogin);
