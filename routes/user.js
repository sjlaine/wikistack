const express = require('express');
const router = express.Router();
module.exports = router;
const Promise = require('bluebird');
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res, next) {
  User.findAll({})
  .then(function(users){
    res.render('userlayout', { users: users });
  })
  .catch(next);

  // res.send('users page!')
});

router.get('/:userId', function(req, res, next) {
  var userPromise = User.findById(req.params.userId);
  var pagesPromise = Page.findAll({
    where: {
      authorId: User.id
    }
  })

  Promise.all([
    userPromise,
    pagesPromise
  ])
  .then(function(values) {
    var user = values[0];
    var pages = values[1];
    res.render('singleuser', { user: user, pages: pages });
  })
  .catch(next);
})
