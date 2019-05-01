const router = require("express").Router();
const passport = require("passport");
const authCheck = require("./authCheck");
const {
  signUpUser,
  showSignUp,
  signInUser,
  showSignIn,
  signOutUser
} = require("../controller/auth");

router.post(
  "/signin",
  passport.authenticate("local", { failureRedirect: "/auth/sigin" }),
  signInUser
);
router.get("/signin", showSignIn);
router.get("/signup", showSignUp);
router.post("/signup", signUpUser);
router.get("/signout", authCheck, signOutUser);

module.exports = router;
