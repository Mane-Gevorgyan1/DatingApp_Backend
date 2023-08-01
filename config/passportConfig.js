const bcrypt = require("bcrypt")
const db = require('../model/model')
const User = db.user
const localStrategy = require("passport-local")
// const FacebookStrategy = require("passport-facebook")
const GoogleStrategy = require("passport-google-oauth2")

module.exports = function (passport) {

    passport.use(new GoogleStrategy({
        clientID: '817542102965-m2edoijq6fcbl3o7fj3finv33srup8l4.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: '/google'
    }, (accessToken, refreshToken, profile, callback) => {
        callback(null, profile)
    }))

    // passport.use(new FacebookStrategy({
    //     clientID: '2262129477509258',
    //     clientSecret: '5c75241e8293c8183adcef0fa6b975ab',
    //     callbackURL: '/facebook',
    //     profileFields: ['email', 'displayName', 'name', 'picture']
    // }, (accessToken, refreshToken, profile, callback) => {
    //     callback(null, profile)
    // }))

    passport.serializeUser((user, callback) => {
        callback(null, user)
    })

    passport.deserializeUser((user, callback) => {
        callback(null, user)
    })

    // local
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