const express = require('express')
const exphbs = require('express-handlebars')

const Record = require('./models/record')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')

const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  Record
    .find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => console.log(err))
})
app.get('/records/new', (req, res) => {
  res.render('new')
})
app.get('/records/edit', (req, res) => {
  res.render('edit')
})

const port = 3000
app.listen(port, () => {
  console.log(`Running on localhast:${port}`)
})