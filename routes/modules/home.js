const router = require('express').Router()
const Todo = require('../../models').Todo

// home page
router.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    next: true,
    where: { UserId: req.user.id }
  })
    .then((todos) => {
      res.render('index', { todos })
    })
    .catch(err => res.status(422).json(err))
})

module.exports = router