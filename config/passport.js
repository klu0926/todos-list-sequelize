const passport = require('passport')
const db = require('../models')
const User = db.User
const useLocalStrategy = require('./strategies/localStrategy')
const useFacebookStrategy = require('./strategies/facebookStrategy')

module.exports = app => {

  // passport init
  app.use(passport.initialize())
  app.use(passport.session())

  // passport local
  useLocalStrategy(passport)

  // passport facebook
  useFacebookStrategy(passport)

  // Authenticate : serializeUser
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // Authorize : deserializeUser
  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => {
        done(null, user.toJSON())
      })
      .catch(err => done(err, false))
  })
}