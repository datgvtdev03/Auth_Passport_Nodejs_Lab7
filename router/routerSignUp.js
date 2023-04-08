const config = require('../config/database');
var express = require("express");
var router = express.Router();
var User = require('../models/userModels');
const bodyParser = require("body-parser");

const parser = bodyParser.urlencoded({ extended: true });
router.use(parser);

router.get("/signup", async (req, res) => {
  res.render("signup", { title: "Đăng kí" });
});

router.post("/signup", async function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: "Please pass username and password." });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    // save the user
    await newUser.save();
    console.log(newUser);
    res.redirect("/lab7/login");
  }
});

module.exports = router;
