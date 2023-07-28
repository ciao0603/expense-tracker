const express = require('express')
const dayjs = require('dayjs')

const Record = require('../../models/record')
const Category = require('../../models/category')

const router = express.Router()
// 新增
router.get('/new', async (req, res) => {
  try {
    const categories = await Category.find().lean()
    res.render('new', { categories })
  } catch (err) {
    console.error(err)
  }
})
router.post('', (req, res) => {
  const userId = req.user._id
  const { name, date, categoryId, amount } = req.body
  Record
    .create({ name, date, categoryId, amount, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
// 修改
router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id

    const record = await Record.findOne({userId, _id}).lean()
    record.date = dayjs(record.date).format('YYYY-MM-DD')

    const categories = await Category.find().lean()

    res.render('edit', { record, categories })

  } catch (err) {
    console.error(err)
  }
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, categoryId, amount } = req.body
  Record
    .findOne({userId, _id})
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
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record
    .findOne({ userId, _id })
    .then(record => record.deleteOne({ _id }))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
