var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var soalSchema = new Schema({
  soal : String,
  jawaban : String,
  category : String
})

var Soal = mongoose.model('Soal', soalSchema);

module.exports = Soal;
