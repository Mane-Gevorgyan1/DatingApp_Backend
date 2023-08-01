const db = require('../model/model')
const User = db.user

class GetController {
    static async getAllUsers(req, res) {
        res.send({ user: req.user })
    }
}

module.exports = GetController