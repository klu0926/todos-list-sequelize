const router = require('express').Router()
const db = require('../../models')
const Todo = db.Todo

// new
router.get('/new', (req, res) => {
  res.render('new')
})

// new post
router.post('/new', (req, res) => {
  const name = req.body.name
  const UserId = req.user.id

  // check input
  if (!name) return res.render('new')

  // create todo
  Todo.create({ name, UserId })
    .then(() => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
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