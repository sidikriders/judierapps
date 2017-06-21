var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var User = require('../models/users');
const jwt = require('jsonwebtoken');

/* GET home page. */
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

router.post('/signup', function(req, res) {
  let hash = bcrypt.hashSync(req.body.password, saltRounds)
  User.create({
    name: req.body.name,
    username: req.body.username,
    password: hash,
    totalScore: 0
  }, function(err, result) {
    if (err) res.send(err)
    res.send("User created")
  })
})

module.exports = router;
