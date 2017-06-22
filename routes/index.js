var express = require('express');
var router = express.Router();
var userCont = require('../Controllers/userController')
var soalCont = require('../Controllers/soalController')

// log in
router.post('/signin', userCont.logIn);
// sign up
router.post('/signup', userCont.signUp)
// get all user, bisa buat leaderboard
router.get('/users', userCont.getAllUser)
// get one user
router.get('/users/:id', userCont.getOneUser)
// update sekor abis selesai main
router.put('/users/:id', userCont.updateScore)

//get all soal
router.get('/soal', soalCont.getAllSoal)
//get soal by category
router.get('/soal/cat/:category', soalCont.getByCategory)
//get one soal
router.get('/soal/:id', soalCont.getOneSoal)
//add soal
router.post('/soal', soalCont.addSoal)
//delete soal
router.delete('/soal/:id', soalCont.deleteSoal)
// update soal
router.put('/soal/:id', soalCont.updateSoal)



module.exports = router;
