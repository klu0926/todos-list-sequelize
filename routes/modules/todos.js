const router = require('express').Router()
const db = require('../../models')
const Todo = db.Todo

// new
router.get('/new', (req, res) => {
  res.render('new')
})


// read one
router.get('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id

  return Todo.findByPk(id, { where: { UserId: userId } })
    .then(todo => {
      res.render('detail', { todo: todo.toJSON() })
    })
    .catch(err => console.log(err))
})

// edit
// delete

module.exports = router