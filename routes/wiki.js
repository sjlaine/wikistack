const express = require('express');
const router = express.Router();
module.exports = router;
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res, next) {
  // res.send('retrieve all wiki pages');
  Page.findAll({})
  .then(function(thePages) {
    res.render('index', {pages: thePages});
  })
  .catch(next);
  // res.redirect('/');
})

router.post('/', function(req, res, next) {
      console.log(req.body);

User.findOrCreate({
  where: {
    name: req.body.author.name,
    email: req.body.author.email
  }
})
.then(function (values) {

  var user = values[0];

  var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });

  return page.save().then(function (createdPage) {
    return createdPage.setAuthor(user);
  });

})
.then(function (page) {
  res.redirect(page.route);
})
.catch(next);

// res.json(page);

})

router.get('/add', function(req, res) {
  // res.send('retrieve the add page form');
  res.render('addpage');
})

router.get('/:urlTitle', function(req, res, next) {
  var urlTitle = req.params.urlTitle;
  Page.findOne({
    where: {
      urlTitle: urlTitle
    }
  })
  .then(function(page) {
    if (page === null) {
      return next(new Error('Page not found!'))
    }
    return page.getAuthor()
    .then(function(author) {
      page.author = author;
      res.render('wikipage', {page: page});
    })
  })
  .catch(next);
})

