const express = require('express')
const exphbs = require('express-handlebars')
const dayjs = require('dayjs')

const Record = require('./models/record')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')

const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  Record
    .find()
    .lean()
    .then(records => {
      records.forEach(record => {
        record.date = dayjs(record.date).format("YYYY/MM/DD")
      })
      res.render('index', { records })
    })
    .catch(err => console.log(err))
})
// 新增
app.get('/records/new', (req, res) => {
  res.render('new')
})
app.post('/records', (req, res) => {
  const {name, date, category, amount} = req.body
  Record
    .create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
// 修改
app.get('/records/edit', (req, res) => {
  res.render('edit')
})


const port = 3000
app.listen(port, () => {
  console.log(`Running on localhast:${port}`)
})