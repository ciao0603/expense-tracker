const express = require('express')
const exphbs = require('express-handlebars')
const dayjs = require('dayjs')
const methodOverride = require('method-override')

const Record = require('./models/record')
const Category = require('./models/category')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')

const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  try {
    const records = await Record.find().lean()
    let totalAmount = 0
    records.forEach(record => {
      record.date = dayjs(record.date).format("YYYY/MM/DD")
      totalAmount += record.amount
      console.log(totalAmount)
    })

    const categories = await Category.find().lean()

    res.render('index', { records, categories, totalAmount })

  } catch (err) {
    console.error(err)
  }
})
// 新增
app.get('/records/new', async (req, res) => {
  try {
    const categories = await Category.find().lean()
    res.render('new', { categories })
  } catch (err) {
    console.error(err)
  }
})
app.post('/records', (req, res) => {
  const { name, date, categoryId, amount } = req.body
  Record
    .create({ name, date, categoryId, amount })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
// 修改
app.get('/records/:id/edit', async (req, res) => {
  try {
    const id = req.params.id

    const record = await Record.findById(id).lean()
    record.date = dayjs(record.date).format('YYYY-MM-DD')

    const categories = await Category.find().lean()

    res.render('edit', { record, categories })

  } catch (err) {
    console.error(err)
  }
})

app.put('/records/:id', (req, res) => {
  const id = req.params.id
  const { name, date, categoryId, amount } = req.body
  Record
    .findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.categoryId = categoryId
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
// 刪除
app.delete('/records/:id', (req, res) => {
  const id = req.params.id
  Record
    .findById(id)
    .then(record => record.deleteOne({ _id: id }))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


const port = 3000
app.listen(port, () => {
  console.log(`Running on localhast:${port}`)
})