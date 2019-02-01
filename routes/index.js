var express = require("express");
var router = express.Router();
const passport = require("passport");
const database = require("../services/adminfunction");
const auth = require("../middleware/authentication");
const jwt = require("../utils/jwt");
const User = require("../models/user");
var bcrypt = require("bcrypt-nodejs");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.json("Auth-Test-API");
});

router.get("/route", (req, res, next) => {
  try {
    return res.redirect("/users");
  } catch (error) {
    next(error);
  }
});

// router.post(
//   "/login",
//   passport.authenticate("login", {
//     successRedirect: "/route",
//     failureRedirect: "/",
//     failureFlash: true
//   })
// );

router.post("/login", async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new Error("User not found!"));
  }
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return next(new Error("Incorrect Password"));
  }
  const token = jwt.generate(user._id);
  res.setHeader("token", token);
  console.log(token);
  res.json({ success: true });
});

router.post("/register", async (req, res, next) => {
  try {
    let message = await database.addUser(req.body);
    console.log(message);
    if (message === "ok") {
      return res.json("Success");
    }
    res.json(message);
  } catch (error) {
    return res.json(error.message);
  }
});

router.get("/session", auth.isApiUser, (req, res, next) => {
  res.json("jwt test success");
});

router.get("/logout", auth.isLoggedIn, (req, res) => {
  req.logout();
  res.json("Logged Out");
});

module.exports = router;
