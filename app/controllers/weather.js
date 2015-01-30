var express = require('express'),
  router = express.Router(),
  basicAuth = require('basic-auth-connect'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Weather = mongoose.model('Weather'),
  cwbWeather = require('../services/cwbWeather');

module.exports = function (app) {
  app.use('/api/weather', router);
};

basicAuth = (basicAuth(function (user, pass, authenticate) {
  User.findOne({uuid: user, access_token: pass}, authenticate);
  var authenticate = function (err, user) {
    if (err) return next(err);
    if (user !== null) return true;
  };  
}));

// get cities weather
router.get('/', basicAuth, function (req, res, next) {
  Weather.find({}, function (err, weather) {
    if (err) return next(err);
    res.json(weather);
  });
});

// get the city weather
router.get('/:id', basicAuth, function (req, res, next) {
  Weather.findOne({ _id: req.params.id }, function (err, weather) {
    if (err) return next(err);
    res.json(weather);
  });
});

// fetch the city weather
router.post('/fetch', basicAuth, function (req, res, next) {
  cwbWeather.fetch(req.body.city, function (err, result) {
    if (err) return next(err);
    res.json(result);
  });
});

router.post('/fetchAll', basicAuth, function (req, res, next) {
  var cities = cwbWeather.cities();
  var count = 0;

  var fetchWeather = function fetchWeather(cityName) {
    cwbWeather.fetch(cities[count].name, function (err, result) {
      if (err) return next(err);
      console.log(result.city + ' Done!');
      count++;
      if (count < cities.length)
        fetchWeather(cities[count].name);
      else 
        res.send('done!');
    });  
  }(cities[count].name);
});
