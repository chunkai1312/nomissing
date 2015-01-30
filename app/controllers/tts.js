var express = require('express'),
  router = express.Router(),
  basicAuth = require('basic-auth-connect'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  itriTTS = require('../services/itriTTS');

module.exports = function (app) {
  app.use('/api/TTSService', router);
};

basicAuth = (basicAuth(function (user, pass, authenticate) {
  User.findOne({uuid: user, access_token: pass}, authenticate);
  var authenticate = function (err, user) {
    if (err) return next(err);
    if (user !== null) return true;
  };  
}));

// ConvertSimple
router.post('/ConvertSimple', basicAuth, function (req, res, next) {
  var param = req.body.TTStext;
  itriTTS.ConvertSimple(param, function(err, result) {
    if (err) next(err);
    res.json(result);
  });
});

// ConvertText
router.post('/ConvertText', basicAuth, function (req, res, next) {
  var params = {
    TTStext: req.body.TTStext,
    TTSSpeaker: req.body.TTSSpeaker,
    volume: req.body.volume,
    speed: req.body.speed,
    outType: req.body.outType
  };

  itriTTS.ConvertText(params, function (err, result) {
    if (err) next(err);
    res.json(result);
  });
});

// ConvertAdvancedText
router.post('/ConvertAdvancedText', basicAuth, function (req, res, next) {
  var params = {
    TTStext: req.body.TTStext,
    TTSSpeaker: req.body.TTSSpeaker, 
    volume: req.body.volume, 
    speed: req.body.speed, 
    outType: req.body.outType,
    PitchLevel: req.body.PitchLevel,
    PitchSign: req.body.PitchSign,
    PitchScale: req.body.PitchScale
  };

  itriTTS.ConvertAdvancedText(params, function(err, result) {
    if (err) next(err);
    res.json(result);
  });
});

// GetConvertStatus
router.post('/GetConvertStatus', basicAuth, function (req, res, next) {
  var param = req.body.convertID;
  itriTTS.GetConvertStatus(param, function(err, result) {
    if (err) next(err);
    res.json(result);
  });
});