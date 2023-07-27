const Record = require('../record')
const Category = require('../category')

const fakeRecord = {
  name: 'breakfast',
  date: '2023-07-26',
  amount: 250,
  categoryName: '餐飲食品',
}

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

db.once('open', async () => {
  try {
    const category = await Category.findOne({ name: fakeRecord.categoryName }).lean()
    fakeRecord.categoryId = category._id
    await Record
      .create(fakeRecord)
      .catch(err => console.log(err))
    console.log('record done')
    process.exit()
  } catch (err) {
    console.error(err)
  }
})