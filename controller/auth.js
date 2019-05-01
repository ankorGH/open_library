const User = require("../model/user");

const showSignUp = (req, res) => {
  res.render("signup");
};

module.exports.showSignUp = showSignUp;

const showSignIn = (req, res) => {
  res.render("signin");
};

module.exports.showSignIn = showSignIn;

const signUp = async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  try {
    const savedUser = await user.save();
    if (savedUser) res.redirect("/auth/signin");
  } catch (e) {
    console.log(e);
  }
};

module.exports.signUpUser = signUp;

const signIn = (req, res) => {
  res.redirect("/book");
};

module.exports.signInUser = signIn;

const signOutUser = (req, res) => {
  req.logout();
  res.redirect("/");
};

module.exports.signOutUser = signOutUser;
