const express = require('express');
const router = express.Router();
module.exports = router;

const wikiRouter = require('./wiki');
const userRouter = require('./user');

router.use('/wiki', wikiRouter);

router.get('/', function(req, res, next) {
  res.redirect('/wiki/')
})

userRouter.get('/', function(req, res, next) {
  res.redirect('/users/')
})
