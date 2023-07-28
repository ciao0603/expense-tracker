const express = require('express')
const dayjs = require('dayjs')

const Record = require('../../models/record')
const Category = require('../../models/category')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const records = await Record.find({ userId }).lean()
    let totalAmount = 0
    records.forEach(record => {
      record.date = dayjs(record.date).format("YYYY/MM/DD")
      totalAmount += record.amount
    })
    const categories = await Category.find().lean()
    res.render('index', { records, categories, totalAmount })
  } catch (err) {
    console.error(err)
  }
})
// 依類別搜尋
router.get('/search', async (req, res) => {
  try {
    const userId = req.user._id
    const categoryId = req.query.sort
    const records = await Record.find({ userId, categoryId }).lean()
    let totalAmount = 0
    records.forEach(record => {
      record.date = dayjs(record.date).format("YYYY/MM/DD")
      totalAmount += record.amount
    })
    const categories = await Category.find().lean()
    res.render('index', { records, categories, totalAmount })
  } catch (err) {
    console.error(err)
  }
})

module.exports = router