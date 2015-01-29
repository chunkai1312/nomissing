var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var WeatherSchema = new Schema({
  city: String,
  text: String,
  audio: String
});

WeatherSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Weather', WeatherSchema);

