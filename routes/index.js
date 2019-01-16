var express = require("express");
var router = express.Router();
const passport = require("passport");
const database = require("../services/adminfunction");
const auth = require("../middleware/authentication");

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

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/route",
    failureRedirect: "/",
    failureFlash: true
  })
);

router.post("/register", async (req, res, next) => {
  try {
    let message = await database.addUser(req.body);
    console.log(message);
    if (message === "ok") {
      return res.send("register is Success");
    }
    res.json(message);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/session", auth.isLoggedIn, (req, res, next) => {
  res.json("session running");
});

router.get("/logout", auth.isLoggedIn, (req, res) => {
  req.logout();
  res.json("Logged Out");
});

module.exports = router;
