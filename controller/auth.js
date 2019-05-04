const User = require("../model/user");

const showSignUp = (req, res) => {
  res.render("signup", { message: "" });
};

module.exports.showSignUp = showSignUp;

const showSignIn = (req, res) => {
  res.render("signin");
};

module.exports.showSignIn = showSignIn;

const signUp = async (req, res, next) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  try {
    const savedUser = await user.save();
    if (savedUser) res.redirect("/auth/signin");
  } catch (e) {
    if (!e.message.includes("duplicate")) return;
    next(new Error("duplicate username"));
  }
};

module.exports.signUpUser = signUp;

const signOutUser = (req, res) => {
  req.logout();
  res.redirect("/");
};

module.exports.signOutUser = signOutUser;
