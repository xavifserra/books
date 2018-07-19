var express = require('express');
const Book = require('../models/book')
var router = express.Router();

router.get('/', function (req, res, next) {
  Book.find({})
  .then((books)=>{
    console.log(books.length)
    res.render('books/list', { books });
  })
  .catch((error)=>{
    next(error);
  })
});

module.exports = router;