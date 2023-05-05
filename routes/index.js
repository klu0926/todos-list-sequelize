const router = require('express').Router()
const home = require('./modules/home')
const users = require('./modules/users')
const auth = require('./modules/auth')
const { isAuthenticated } = require('../middleware/auth')

router.use('/users', users)
router.use('/auth', auth)
router.use('/', isAuthenticated, home)
  
module.exports = router