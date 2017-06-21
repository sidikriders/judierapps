var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name :String,
  username : String,
  password : String,
  totalScore : Number,
  weeklyScore : Number
})

var User = mongoose.model('User', userSchema);

module.exports = User;
