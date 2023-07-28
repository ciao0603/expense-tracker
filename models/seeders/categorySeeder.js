const Category = require('../category')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const CATEGORY = require('./seedData/categoryData.json')

db.once('open', async() => {
  try {
    for(let category of CATEGORY) {
      await Category.create(category)
        .catch(err => console.log(err))
    }
    console.log('category done')
    process.exit()
  } catch(err){
    console.error(err)
  }
})