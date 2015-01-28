var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

  User.find(function (err, users) {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      users: users
    });
  });
});
