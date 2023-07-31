const bcrypt = require("bcrypt");
const db = require('../model/model');
const User = db.user;

const localStrategy = require("passport-local");

module.exports = function (passport) {

    passport.use(
        new localStrategy.Strategy(async (username, password, done) => {
            const user = await User.findOne({ email: username }).then((user) => {
                if (user) {
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err) throw err;
                        if (result === true) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    });
                }
                else {
                    return done(null, false);
                }
            })
        })

    );

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser(async (id, cb) => {
        const user = await User.findOne({ _id: id })
        const userInfo = {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email
        }
        cb(null, userInfo);
    });
};