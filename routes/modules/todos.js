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
  const UserId = req.user.id

  return Todo.findByPk(id, { where: { UserId } })
    .then(todo => {
      res.render('detail', { todo: todo.toJSON() })
    })
    .catch(err => console.log(err))
})

// edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const userId = req.user.id

  return Todo.findByPk(id, { where: { UserId: userId } })
    .then(todo => {
      res.render('edit', { todo: todo.toJSON() })
    })
    .catch(err => console.log(err))
})

// edit PUT
router.put('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  const { name, isDone } = req.body

  return Todo.findByPk(id, { where: { UserId: userId } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(err => console.log(err))
})

// delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id

  return Todo.findByPk(id, { where: { UserId: userId } })
    .then(todo => todo.destroy())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router