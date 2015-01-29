var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  cwbWeather = require('../services/cwbWeather');

module.exports = function (app) {
  app.use('/api/weather', router);
};

router.post('/get', function (req, res, next) {
  cwbWeather.getWeather();
});
