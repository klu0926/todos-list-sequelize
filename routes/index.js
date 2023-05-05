const router = require('express').Router()
const home = require('./modules/home')
const users = require('./modules/users')
const auth = require('./modules/auth')
const todos = require('./modules/todos')
const { isAuthenticated } = require('../middleware/auth')

router.use('/users', users)
router.use('/auth', auth)
router.use('/todos', isAuthenticated, todos)
router.use('/', isAuthenticated, home)

module.exports = router