const express = require('express');
const mongodb = require('mongoose');
const bodyParser = require("body-parser");
const expressHbs = require('express-handlebars');
const loginRouter = require('./router/loginRouter');
const signupRouter = require('./router/routerSignUp');
const bookRouter = require('./router/routerBook');
const app = express();
const port = process.env.PORT || 4000;
const config = require('./config/database');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine(
  ".hbs",
  expressHbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: "views/layouts/",
  })
);
app.set("view engine", "hbs");

mongodb.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected"));


app.use("/lab7", loginRouter);
app.use("/lab7", signupRouter);
app.use("/lab7", bookRouter);

app.use(function (req, res, next) {
  console.log("404 - Khong tim thay trang");
  next();
});


app.listen(port, () => {
  console.log(`Server đang chạy cổng: ${port}`);
});