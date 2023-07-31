const express = require("express");
const passport = require('passport');
require('../config/passportConfig')(passport)
const router = express.Router();
const AuthController = require("../controller/authController");
const GetController = require("../controller/getController");

router.get('/getAllUsers', GetController.getAllUsers)

router.post('/register', AuthController.register)
router.post('/codeVerification', AuthController.codeVerification)

router.post('/login', passport.authenticate("local"), AuthController.login)

module.exports = router;