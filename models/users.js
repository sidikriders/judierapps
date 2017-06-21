var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name : {

  },
  username : {
    type: String,
    unique: true
  },
  password : String,
  totalScore : Number,
  weeklyScore : Number
})

var User = mongoose.model('User', userSchema);

module.exports = User;
