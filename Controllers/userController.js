const User = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

function logIn(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, result) {
    if (err) {
      res.send(err)
    } else if (result == null) {
      res.send("invalid username")
    } else {
      if (bcrypt.compareSync(req.body.password, result.password)) {
        let token = jwt.sign({name: result.name, aidi: result._id}, "tebakGambar")
        res.send(token)
      } else {
        res.send("invalid password");
      }
    }
  })
}

function signUp(req, res) {
  let hash = bcrypt.hashSync(req.body.password, saltRounds)
  User.create({
    name: req.body.name,
    username: req.body.username,
    password: hash,
    totalScore: 0,
    weeklyScore: 0,
  }, function(err, result) {
    if (err) res.send(err)
    res.send("User created")
  })
}

function getAllUser(req, res) {
  User.find({}, function(err, result) {
    res.send(result.map(rexult=> {
      let terbaru = {
        _id: rexult._id,
        username: rexult.username,
        weeklyScore: rexult.weeklyScore,
        totalScore: rexult.totalScore
      }
      return terbaru
    }))
  })
}

function getOneUser(req, res) {
  User.findOne({
    _id: req.params.id
  }, function(err, result) {
    if (err) res.send(err)
    res.send(result)
  })
}

function updateScore(req, res) {
  User.findOne({
    _id: req.params.id
  }, function(err, result) {
    let newScore = parseInt(req.body.score)
    let totalScoreUpdate = result.totalScore + newScore;
    let weeklyScoreUpdate = result.weeklyScore + newScore;
    User.updateOne({
      _id: req.params.id
    }, {
      totalScore: totalScoreUpdate,
      weeklyScore: weeklyScoreUpdate
    }, function(err, rezult) {
      res.send("score updated")
    })
  })
}

function deleteOne(req, res) {
  User.remove({
    _id: req.params.id
  }, function(err, result) {
    if (err) res.send(err)
    res.send("1 users terhapus")
  })
}

module.exports = {
  logIn,
  signUp,
  getAllUser,
  getOneUser,
  updateScore,
  deleteOne
}
