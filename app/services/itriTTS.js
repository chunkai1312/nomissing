var soap = require('soap'),
  config = {
    url: 'http://tts.itri.org.tw/TTSService/Soap_1_3.php?wsdl',
    accountID: 'idsl.cs.ntust',
    password: 'ma300'
  };

exports.ConvertSimple = function (param, callback) {
  var args = {
    accountID: config.accountID,
    password: config.password,
    TTStext: param
  };
  soap.createClient(config.url, function (err, client) {
    if (err) return callback(err);

    client.ConvertSimple(args, function (err, result) {
      if (err) return callback(err);

      var resultArray = (result.Result.$value).split("&");
      var data = {
        resultCode: resultArray[0],
        resultString: resultArray[1],
        resultConvertID: resultArray[2],
      };
      return callback(null, data);
    });
  });
};

exports.ConvertText = function (params, callback) {
  var args = {
    accountID: config.accountID,
    password: config.password,
    TTStext: params.TTStext,
    TTSSpeaker: params.TTSSpeaker,
    volume: params.volume,
    speed: params.speed,
    outType: params.outType
  };
  soap.createClient(config.url, function (err, client) {
    if (err) return callback(err);

    client.ConvertText(args, function (err, result) {
      if (err) return callback(err);

      var resultArray = (result.Result.$value).split("&");
      var data = {
        resultCode: resultArray[0],
        resultString: resultArray[1],
        resultConvertID: resultArray[2],
      };
      return callback(null, data);
    });
  });
};

exports.ConvertAdvancedText = function (params, callback) {
  var args = {
    accountID: config.accountID,
    password: config.password,
    TTStext: params.TTStext,
    TTSSpeaker: params.TTSSpeaker,
    volume: params.volume,
    speed: params.speed,
    outType: params.outType,
    PitchLevel: params.PitchLevel,
    PitchSign: params.PitchSign,
    PitchScale: params.PitchScale
  };
  soap.createClient(config.url, function (err, client) {
    if (err) return callback(err);

    client.ConvertAdvancedText(args, function (err, result) {
      if (err) return callback(err);

      var resultArray = (result.Result.$value).split("&");
      var data = {
        resultCode: resultArray[0],
        resultString: resultArray[1],
        resultConvertID: resultArray[2],
      };
      return callback(null, data);
    });
  });
};

exports.GetConvertStatus = function (param, callback) {
  var args = {
    accountID: config.accountID,
    password: config.password,
    convertID: param
  };
  soap.createClient(config.url, function (err, client) {
    if (err) return callback(err);

    client.GetConvertStatus(args, function (err, result) {
      if (err) return callback(err);

      var resultArray = (result.Result.$value).split("&");
      var data = {
        resultCode: resultArray[0],
        resultString: resultArray[1],
        statusCode: resultArray[2], 
        status: resultArray[3],
      };
      if (data.resultCode == 0 && data.statusCode == 2)
       data.resultUrl = resultArray[4];
      return callback(null, data);
    });
  });
};