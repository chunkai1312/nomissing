var soap = require('soap'),
  config = {
    url: 'http://tts.itri.org.tw/TTSService/Soap_1_3.php?wsdl',
    accountID: 'idsl.cs.ntust',
    password: 'ma300'
  };

exports.ConvertSimple = function (TTStext) {
  var args = {
    accountID: config.accountID,
    password: config.password,
    TTStext: TTStext
  };
  soap.createClient(config.url, function (err, client) {
    client.ConvertSimple(args, function (err, result) {
      return result;
    });
  });
};

exports.ConvertText = function (TTStext, TTSSpeaker, volume, speed, outType) {
  var args = {
    accountID: config.accountID,
    password: config.password,
    TTStext: TTStext,
    TTSSpeaker: TTSSpeaker,
    volume: volume,
    speed: speed,
    outType: outType
  };
  soap.createClient(config.url, function (err, client) {
    client.ConvertText(args, function (err, result) {
      return result;
    });
  });
};

exports.ConvertAdvancedText = function (TTStext, TTSSpeaker, volume, speed, outType, PitchLevel, PitchSign, PitchScale) {
  var args = {
    accountID: config.accountID,
    password: config.password,
    TTStext: TTStext,
    TTSSpeaker: TTSSpeaker,
    volume: volume,
    speed: speed,
    outType: outType,
    PitchLevel: PitchLevel,
    PitchSign: PitchSign,
    PitchScale: PitchScale
  };
  soap.createClient(config.url, function (err, client) {
    client.ConvertAdvancedText(args, function (err, result) {
      return result;
    });
  });
};

exports.GetConvertStatus = function (convertID) {
  var args = {
    accountID: config.accountID,
    password: config.password,
    convertID: convertID
  };
  soap.createClient(config.url, function (err, client) {
    client.GetConvertStatus(args, function (err, result) {
      return result;
    });
  });
};