const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const db = require('../../models')
const User = db.User

module.exports = passport => {

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']
      },
      (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json

        // find user
        User.findOne({ where: { email } })
          .then(user => {

            // 有只用者就成功登入，回傳使用者給 serializedUser
            if (user) return done(null, user)

            // 沒有使用者就做一個
            // toString(36) 是只用 0-9, a-z, 最後取8位數
            const randomPassword = Math.random().toString(36).slice(-8)

            return bcrypt.genSalt(10)
              .then(salt => bcrypt.hash(randomPassword, salt))
              .then(hash => User.create({
                name,
                email,
                password: hash
              }))
              .then(user => done(null, user))
              .catch(err => done(err, false))
          })
      }
    ))
}