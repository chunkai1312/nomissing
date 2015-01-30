var express = require('express'),
  router = express.Router(),
  crypto = require('crypto'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/auth', router);
};

router.post('/register', function (req, res, next) {
  if (!req.body.uuid) {
    res.json({code: -1, message: 'invalid registration'});
  }

  User.findOne({ uuid:req.body.uuid }, function (err, user) {
    if (err) return next(err);
    if (user !== null) res.json({code: -2, message: 'uuid already in use'});

    // new user
    user = new User();
    user.uuid = req.body.uuid;
    user.access_token = crypto.randomBytes(48).toString('hex');
    user.save(function (err) {
      if (err) next(err);
      res.json({code: 0, message: 'registration successful'});
    })
  });
});
