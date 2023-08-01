const express = require("express");
const passport = require('passport');
require('../config/passportConfig')(passport)
const router = express.Router();
const AuthController = require("../controller/authController");
const GetController = require("../controller/getController");

router.get('/googleUser', AuthController.googleUser)

router.get('/getAllUsers', GetController.getAllUsers)

router.post('/register', AuthController.register)
router.post('/codeVerification', AuthController.codeVerification)

router.post('/login', passport.authenticate("local"), AuthController.login)

router.get('/login/google', passport.authenticate('google', { scope: ['profile email'] }))
// router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email'] }))

router.get('/google', passport.authenticate('google'), (req, res) => {
    res.redirect('/googleUser')
})

// router.get('/facebook', passport.authenticate('facebook'), (req, res) => {
//     res.redirect('/')
// })

module.exports = router;