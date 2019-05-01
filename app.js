const express = require("express");
const localStrategy = require("./auth/local_strategy");
const passport = require("passport");
const cookieSession = require("cookie-session");
const authRouter = require("./routes/auth");
const bookRouter = require("./routes/book");
const methodOveride = require("method-override");

const connectToDatabase = require("./model/index")();
const app = express();

const path = require("path");
const bodyParser = require("body-parser");

const { PORT, COOKIE_NAME, COOKIE_KEY } = require("./config");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  cookieSession({
    name: COOKIE_NAME,
    keys: [COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOveride("_method"));

app.use("/auth", authRouter);
app.use("/book", bookRouter);

app.get("/", (req, res) => {
  if (req.user) {
    return res.redirect("book/");
  }
  res.render("index");
});

app.listen(PORT, () => {
  console.log(PORT, " Yep Listening");
});
