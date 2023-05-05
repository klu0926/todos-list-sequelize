const router = require('express').Router()
const home = require('./modules/home')
const users = require('./modules/users')
const auth = require('./modules/auth')

router.use('/users', users)
router.use('/auth', auth)
router.use('/', home)

module.exports = router