const bcrypt = require('bcryptjs')

const Record = require('../record')
const Category = require('../category')
const User = require('../user')
const RECORD = require('./seedData/recordData.json')
const USER = require('./seedData/userData.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

db.once('open', async () => {
  try {
    for (let seedUser of USER) {
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(seedUser.password, salt)
      const user = await User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      })
      const userId = user._id
      for (let i = 0; i < RECORD.length; i++) {
        if (seedUser.recordIndex.includes(i)) {
          console.log(i)
          const record = RECORD[i]
          const category = await Category.findOne({ name: record.categoryName }).lean()
          record.categoryId = category._id
          record.userId = userId
          await Record
            .create(record)
        }
      }
    }
    process.exit()
  } catch (err) {
    console.error(err)
  }
})