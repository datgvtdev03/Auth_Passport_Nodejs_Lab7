const express = require('express');
const config = require('../config/database');
var router = express.Router();
const userModels = require('../models/userModels');
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const parser = bodyParser.urlencoded({ extended: true });
router.use(parser);
router.use(cookieParser());

router.get('/login', (req, res) => {
  res.render('login', {title: "Đăng nhập"});
});

router.post("/login", async function (req, res) {
  console.log(req.body);
  let userLogin = await userModels.findOne({ username: req.body.username });
  if (!userLogin) {
    res
      .status(401)
      .send({ success: false, msg: "Authentication failed. User not found." });
  } else {
    userLogin.comparePassword(req.body.password, function (err, isMatch) {
      if (isMatch && !err) {
        var token = jwt.sign({ user: userLogin }, config.secret, {
          expiresIn: "1h",
        });
        res.cookie("token", token, { maxAge: 7200000, httpOnly: true });
        res.redirect("/lab7/listbook");
      } else {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. Wrong password.",
        });
      }
    });
  }
});

module.exports = router;