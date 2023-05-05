const router = require('express').Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { User } = require('../../models')

// login
router.get('/login', (req, res) => {
  res.render('login')
})

// login post
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))


// register
router.get('/register', (req, res) => {
  res.render('register')
})

// register post
router.post('/register', (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body

  // missing input?
  if (!name, !email, !password, !confirmPassword) {
    res.locals.warning_msg = 'Please complete all fields.'
    return res.render('register', { name, email })
  }

  // confirm password?
  if (password !== confirmPassword) {
    res.locals.warning_msg = 'confirm password do not match.'
    return res.render('register', { name, email })
  }

  // find user
  User.findOne({ where: { email } })
    .then(user => {

      // email register?
      if (user) {
        res.locals.warning_msg = 'this email is already registered.'
        return res.render('register', { name, email })
      }

      // create user
      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(user => {
          // login
          req.logIn(user, err => {
            if (err) return next(err);
            req.flash('success_msg', 'You successfully created an account.')
            res.redirect('/')
          })
        })
    })
})


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