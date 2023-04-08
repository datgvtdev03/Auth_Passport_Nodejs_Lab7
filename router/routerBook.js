var config = require("../config/database");
var middleware = require("../config/middleware");
var express = require("express");
var router = express.Router();
var Book = require("../models/bookModels");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const parser = bodyParser.urlencoded({ extended: true });
router.use(parser);
router.use(cookieParser());



router.get("/listbook", middleware, async function (req, res) {
  let arrBooks = await Book.find().lean();
  arrBooks = arrBooks.map((product, index) => {
    product.index = index + 1;
    return product;
  });
  res.render("book", { title: "Sách", arrBooks });
});


router.get('/addbook', (req, res) => {
  res.render('addOrEdit', {title: "add book"})
})

router.post("/addbook", middleware, async function (req, res) {
  console.log(req.body);
  var newBook = new Book({
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
  });
  try {
    await newBook.save();
    res.redirect("/lab7/listbook");
  } catch (err) {
    res.status(500).send("Đã có lỗi xảy ra!");
  }
});

router.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.redirect("/lab7/listbook");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
