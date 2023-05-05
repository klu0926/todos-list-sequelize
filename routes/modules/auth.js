const router = require('express').Router()
const passport = require('passport')

// facebook OAuth
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

// OAuth callback
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/', 
  failureRedirect: 'users/login'
}))

module.exports = router

