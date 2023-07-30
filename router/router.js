const express = require("express");
const AuthController = require("../controller/authController");
const GetController = require("../controller/getController");
const router = express.Router();

router.get('/getAllUsers', GetController.getAllUsers)

router.post('/register', AuthController.register)
router.post('/codeVerification', AuthController.codeVerification)

module.exports = router;
