var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name : {
    type: String,
    required: true
  },
  username : {
    type: String,
    unique: true,
    required: true
  },
  password : {
    type: String,
    required: true
  },
  totalScore : Number,
  weeklyScore : Number
})

var User = mongoose.model('User', userSchema);

module.exports = User;
