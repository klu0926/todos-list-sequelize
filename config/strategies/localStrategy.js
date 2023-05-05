const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../../models')
const User = db.User

module.exports = passport => {

  passport.use(new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email'
    },
    (req, email, password, done) => {
      // Find user with email
      User.findOne({ where: { email } })
        .then(user => {

          // can't find user
          if (!user) {
            return done(null, false, req.flash('warning_msg', 'This email is not registered!'))
          }

          // user found, compare password
          bcrypt.compare(password, user.password)
            .then(isMatch => {
              // wrong password
              if (!isMatch) {
                return done(null, false, req.flash('warning_msg', 'Email or Password incorrect'))
              }
              // all correct return user
              return done(null, user)
            })
        })
        .catch(err => done(err, false))
    }))
}