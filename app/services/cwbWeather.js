var request = require('request'),
  xml2js = require('xml2js'),
  cwbWeather = {
    base_url: 'http://opendata.cwb.gov.tw/opendata/MFC/',
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

exports.getWeather = function () {
  request('http://opendata.cwb.gov.tw/opendata/MFC/F-C0032-009.xml', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var parser = new xml2js.Parser();
      parser.parseString(body, function (err, result) {
          console.dir(result);
          var data = result.cwbopendata.dataset[0].parameterSet[0].parameter,
            text = '';
          
          for (var i = 0; i < data.length; i++) {
            text = text + data[i].parameterValue[0];
          }
          console.log(text);
          // return text;
      });
      
    }
  });
};
