const router = require('express').Router()
const passport = require('passport')

// login
router.get('/login', (req, res) => {
  res.render('login')
})

// login post
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router