const express = require('express');
const Book = require('../models/book')
const router = express.Router();

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

router.get('/new', (req, res, next) => {
  res.render('books/new');
})

router.post('/', (req, res, next) => {
  const { title, author, description, rating } = req.body;
  Book.create({ title, author, description, rating })
    .then(data => {
      res.redirect('/books');
    })
    .catch(error => {
      next(error);
    })
})

router.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Book.findById(id)
    .then((book) => {
      res.render('books/edit', book);
    })
    .catch(error => {
      next(error);
    })
})

router.post('/:id', (req, res, next) => {
  const { id } = req.params;
  const { title, description, author, rating } = req.body;
  Book.findByIdAndUpdate(id, { title, description, author, rating })
    .then((data) => {
      res.redirect('/books');
    })
    .catch(error => {
      next(error);
    })
})

router.post('/:id/remove', (req, res, next) => {
  const { id } = req.params;
  Book.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/books')
    })
    .catch(error => {
      next(error);
    })
})


module.exports = router;