var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  soap = require('soap'),
  itriTTS = {
    url: 'http://tts.itri.org.tw/TTSService/Soap_1_3.php?wsdl',
    accountID: 'idsl.cs.ntust', 
    password: 'ma300' 
  };

module.exports = function (app) {
  app.use('/api/TTSService', router);
};

// ConvertSimple
router.post('/ConvertSimple', function (req, res, next) {
  var args = {
    accountID: itriTTS.accountID, 
    password: itriTTS.password, 
    TTStext: req.body.TTStext
  };
  soap.createClient(itriTTS.url, function(err, client) {
    client.ConvertSimple(args, function(err, result) {
      res.send(result);
    });
  });
});

// ConvertText
router.post('/ConvertText', function (req, res, next) {
  var args = {
    accountID: itriTTS.accountID, 
    password: itriTTS.password, 
    TTStext: req.body.TTStext,
    TTSSpeaker: req.body.TTSSpeaker, 
    volume: req.body.volume, 
    speed: req.body.speed, 
    outType: req.body.outType
  };
  soap.createClient(itriTTS.url, function(err, client) {
    client.ConvertText(args, function(err, result) {
        res.send(result);
    });
  });
});

// ConvertAdvancedText
router.post('/ConvertAdvancedText', function (req, res, next) {
  var args = {
    accountID: itriTTS.accountID, 
    password: itriTTS.password, 
    TTStext: req.body.TTStext,
    TTSSpeaker: req.body.TTSSpeaker, 
    volume: req.body.volume, 
    speed: req.body.speed, 
    outType: req.body.outType,
    PitchLevel: req.body.PitchLevel,
    PitchSign: req.body.PitchSign,
    PitchScale: req.body.PitchScale
  };
  soap.createClient(itriTTS.url, function(err, client) {
    client.ConvertAdvancedText(args, function(err, result) {
        res.send(result);
    });
  });
});

// GetConvertStatus
router.post('/GetConvertStatus', function (req, res, next) {
  var args = {
    accountID: itriTTS.accountID, 
    password: itriTTS.password,  
    convertID: req.body.convertID
  };
  soap.createClient(itriTTS.url, function(err, client) {
    client.GetConvertStatus(args, function(err, result) {
      res.send(result);
    });
  });
});
