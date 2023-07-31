const db = require('../model/model')
const User = db.user
const bcrypt = require('bcrypt')

class AuthController {

    static async register(req, res) {
        if (!req.body.name) {
            res.send({ success: false, message: 'name field is required' })
        } else if (!req.body.surname) {
            res.send({ success: false, message: 'surname field is required' })
        } else if (!req.body.email) {
            res.send({ success: false, message: 'email field is required' })
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
            res.send({ success: false, message: 'email field must be a valid email' })
        } else if (!req.body.phone) {
            res.send({ success: false, message: 'phone field is required' })
        } else if (!req.body.age) {
            res.send({ success: false, message: 'age field is required' })
        } else if (!req.body.about) {
            res.send({ success: false, message: 'about field is required' })
        } else if (!req.body.country) {
            res.send({ success: false, message: 'country field is required' })
        } else if (!req.body.nationality) {
            res.send({ success: false, message: 'nationality field is required' })
        } else if (!req.body.sex) {
            res.send({ success: false, message: 'sex field is required' })
        } else if (!req.body.birthday) {
            res.send({ success: false, message: 'birthday field is required' })
        } else if (!req.body.password) {
            res.send({ success: false, message: 'password field is required' })
        } else if (req.body.password.length < 6) {
            res.send({ success: false, message: 'password must have at least 6 digits' })
        } else if (!req.body.location) {
            res.send({ success: false, message: 'location field is required' })
        } else if (!req.body.distance) {
            res.send({ success: false, message: 'distance field is required' })
        } else if (!req.body.preferedStartAge) {
            res.send({ success: false, message: 'preferedStartAge field is required' })
        } else if (!req.body.preferedEndAge) {
            res.send({ success: false, message: 'preferedEndAge field is required' })
        } else if (req.body.spokenLanguages.length = 0) {
            res.send({ success: false, message: 'spokenLanguages field is required' })
        } else {
            const user = await User.find({ phone: req.body.phone })
            if (user.length) {
                res.send({ success: false, message: 'Phone is already registered' })
            } else {
                const hash = bcrypt.hashSync(req.body.password, 10);
                const user = await new User({
                    ...req.body,
                    verificationCode: Math.floor(1000 + Math.random() * 9000),
                    password: hash
                })
                user.save(user)
                    .then(() => {
                        res.send({ sucess: true, userId: user._id })
                    })
                    .catch((err) => {
                        res.send({ success: false, err })
                    })
            }
        }
    }

    static async codeVerification(req, res) {
        // code, id
        if (!req.body.code) {
            res.send({ success: false, error: "Code field is required" })
        } else if (!req.body.id) {
            res.send({ success: false, error: "User.id is required" })
        } else {
            const user = await User.findById(req.body.id)
            if (req.body.code == user.verificationCode) {
                await User.updateOne({ _id: req.body.id }, {
                    phoneIsVerified: true,
                    verificationCode: null
                }, {
                    where: {
                        id: req.body.id
                    }
                })
                const user = await User.find({ _id: req.body.id })
                res.send({ success: true, message: 'Phone number is verified', user })
            } else {
                res.send({ success: false, message: 'Incorrect code' })
            }
        }
    }

    static async login(req, res) {
        res.send({ user: req.user })
    }

}

module.exports = AuthController