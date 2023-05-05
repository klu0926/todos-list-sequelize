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

// logout
router.get('/logout', (req, res, next) => {
  // passport 0.6 版本以後 logout 變成 async 需要使用 callback
  req.logout(err => {
    if (err) return next(err);
    req.flash('success_msg', 'You successfully logout')
    res.redirect('/users/login')
  })
})

module.exports = router