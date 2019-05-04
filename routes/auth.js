const router = require("express").Router();
const passport = require("passport");
const authCheck = require("./authCheck");
const {
  signUpUser,
  showSignUp,
  showSignIn,
  signOutUser
} = require("../controller/auth");

router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/auth/signin",
    successRedirect: "/book"
  })
);

// show signin page
router.get("/signin", showSignIn);

// show signup message
router.get("/signup", showSignUp);

// signup user
router.post("/signup", signUpUser);

// signout user
router.get("/signout", authCheck, signOutUser);

module.exports = router;
