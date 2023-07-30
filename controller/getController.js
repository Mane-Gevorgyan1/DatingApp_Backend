const db = require('../model/model')
const User = db.user

class GetController {
    static async getAllUsers(req, res) {
        const users = await User.find()
        res.send({ success: true, users })
    }
}

module.exports = GetController