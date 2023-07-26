const Record = require('../record')

const fakeRecord = {
  name: 'breakfast',
  date: '2023-07-26',
  amount: 250
}

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

db.once('open', () => {
  Record
    .create(fakeRecord)
    .catch(err => console.log(err))
  console.log('done')
})