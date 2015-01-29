var mongoose = require('mongoose'),
  Weather = mongoose.model('Weather'),
  request = require('request'),
  parseString = require('xml2js').parseString,
  itriTTS = require('../services/itriTTS'),
  cwbWeather = {
    baseUrl: 'http://opendata.cwb.gov.tw/opendata/MFC/',
    city: [
      { name: '台北市', xml: 'F-C0032-009.xml' },
      { name: '新北市', xml: 'F-C0032-010.xml' },
      { name: '基隆市', xml: 'F-C0032-011.xml' },
      { name: '花蓮縣', xml: 'F-C0032-012.xml' },
      { name: '宜蘭縣', xml: 'F-C0032-013.xml' },
      { name: '金門縣', xml: 'F-C0032-014.xml' },
      { name: '澎湖縣', xml: 'F-C0032-015.xml' },
      { name: '台南市', xml: 'F-C0032-016.xml' },
      { name: '高雄市', xml: 'F-C0032-017.xml' },
      { name: '嘉義縣', xml: 'F-C0032-018.xml' },
      { name: '嘉義市', xml: 'F-C0032-019.xml' },
      { name: '苗栗縣', xml: 'F-C0032-020.xml' },
      { name: '台中市', xml: 'F-C0032-021.xml' },
      { name: '桃園市', xml: 'F-C0032-022.xml' },
      { name: '新竹縣', xml: 'F-C0032-023.xml' },
      { name: '新竹市', xml: 'F-C0032-024.xml' },
      { name: '屏東縣', xml: 'F-C0032-025.xml' },
      { name: '南投縣', xml: 'F-C0032-026.xml' },
      { name: '台東縣', xml: 'F-C0032-027.xml' },
      { name: '彰化縣', xml: 'F-C0032-028.xml' },
      { name: '雲林縣', xml: 'F-C0032-029.xml' },
      { name: '連江縣', xml: 'F-C0032-030.xml' },
    ]
  };

exports.cities = function () {
  return cwbWeather.city;
};

exports.fetch = function (cityName, callback) {
  var city, xml, memo, text = '';

  var findCityByName = function (cityName) {
    for (var index in cwbWeather.city) {
      if (cwbWeather.city[index].name === cityName) {
        xml = xml + cwbWeather.city[index].xml;
        return cwbWeather.city[index];
      }
    }
    return null;
  }

  // find city by name
  city = findCityByName(cityName);
  if (findCityByName(cityName) === null) 
    return callback(new Error('City not found'));

  // fetch xml file from CWB
  xml = cwbWeather.baseUrl + city.xml;
  request(xml, function (error, response, body) {
    if (error) return callback(error);
    if (response.statusCode != 200) return callback(new Error('Request error.'));

    // parse xml string 
    parseString(body, function (err, result) {
      if (err) return callback(err);
      
      memo = result.cwbopendata.dataset[0].parameterSet[0].parameter;
      for (var index in memo) {
        text = text + memo[index].parameterValue[0];
      }
      console.log('--\n' + cityName + '\n' + text);

      // use itriTTS.ConvertSimple
      itriTTS.ConvertSimple(text, function (err, result) {
        if (err) return callback(err);

        // fetch audio file
        var fetchAudio = function fetchAudio(convertID) {
          itriTTS.GetConvertStatus(convertID, function (err, result) {
            if (err) callback(err);
            if (!result.audio) {
              fetchAudio(convertID);
            }
            else {
              console.log(result.audio);

              // save city's weather data 
              Weather.findOne({city: cityName}, function (err, weather) {
                if (err) return callback(err);
                if (weather === null) weather = new Weather();
                weather.city = cityName;
                weather.text = text;
                weather.audio = result.audio;
                weather.save(function (err) {
                  if (err) return callback(err);
                  return callback(null, weather);
                });
              });
            }
          });
        }(result.resultConvertID);
      });
    });
  });
};

//   fetchAll : function (callback) {


//     var i = 0;
//     for (var index in cwbWeather.city) {
//       setTimeout(function(index) {
//         module.exports.fetch(cwbWeather.city[index].name, function (err, result) {
//           if (err) return callback(err);
//           i++;
//           console.log(i);
//           if (i === cwbWeather.city.length) {
//             console.log('ok');
//           }
//         });  
//       }, index*5000, index );

//     }
//   }

// };





