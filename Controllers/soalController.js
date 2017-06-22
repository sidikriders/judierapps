var Soal = require('../models/soal');

function getAllSoal(req, res) {
  Soal.find({}, function(err, result) {
    if (err) res.send(err)
    res.send(result)
  })
}

function getByCategory(req, res) {
  Soal.find({
    category: req.params.category
  }, function(err, result) {
    if (err) res.send(err)
    res.send(result)
  })
}

function getOneSoal(req,res) {
  Soal.findOne({
    _id: req.params.id
  }, function(err, result) {
    if (err) res.send(err)
    res.send(result)
  })
}

function addSoal(req, res) {
  Soal.create({
    soal: req.body.soal,
    jawaban: req.body.jawaban,
    category: req.body.category,
  }, function(err, result) {
    if (err) res.send(err)
    res.send("1 inserted")
  })
}

function deleteSoal(req, res) {
  Soal.remove({
    _id: req.params.id
  }, function(err, result) {
    if (err) res.send(err)
    res.send("1 deleted")
  })
}

function updateSoal(req, res) {
  console.log('dah masuk sini');
  Soal.updateOne({
    _id: req.params.id
  }, {
    soal: req.body.soal,
    jawaban: req.body.jawaban,
    category: req.body.category,
  }, function(err, result) {
    if (err) res.send(err)
    res.send("1 updated")
  })
}

module.exports = {
  getAllSoal,
  getByCategory,
  getOneSoal,
  addSoal,
  deleteSoal,
  updateSoal
}
