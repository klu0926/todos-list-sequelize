// set env
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

// modules
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const routes = require('./routes')

// app
const app = express()
const PORT = process.env.PORT || 3000

// view engine
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: 'hbs'
}))
app.set('view engine', 'hbs')

// middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
// < passport here
app.use(methodOverride('_method'))
app.use(flash())
// < passport and flash handle here

// routes
app.use(routes)

// server start
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})


