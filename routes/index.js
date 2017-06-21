var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var User = require('../models/users');
const jwt = require('jsonwebtoken');

// log in
router.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, result) {
    if (err) {
      res.send(err)
    } else if (result == null) {
      res.send("invalid username")
    } else {
      if (bcrypt.compareSync(req.body.password, result.password)) {
        let token = jwt.sign({name: result.name}, "tebakGambar")
        res.send(token)
      } else {
        res.send("invalid password");
      }
    }
  })
});
// sign up
router.post('/signup', function(req, res) {
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
})
// get all user, bisa buat leaderboard
router.get('/users', function(req, res) {
  User.find({}, function(err, result) {
    res.send(result.map(rexult=> {
      let terbaru = {
        username: rexult.username,
        weeklyScore: rexult.weeklyScore,
        totalScore: rexult.totalScore
      }
      return terbaru
    }))
  })
})
// update sekor abis selesai main
router.put('/users/:id', function(req, res) {
  User.findOne({
    _id: req.params.id
  }, function(err, result) {
    let totalScoreUpdate = result.totalScore + req.body.score;
    let weeklyScoreUpdate = result.weeklyScore + req.body.score;
    User.updateOne({
      _id: req.params.id
    }, {
      totalScore: totalScoreUpdate,
      weeklyScore: weeklyScoreUpdate
    }, function(err, rezult) {
      res.send("score updated")
    })
  })
})

module.exports = router;
