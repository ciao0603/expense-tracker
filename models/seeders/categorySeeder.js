const Category = require('../category')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')

const CATEGORY = [{
  name: '家居物業',
  icon: 'fa-house'
}, {
  name: '交通出行',
  icon: 'fa-van-shuttle'
}, {
  name: '休閒娛樂',
  icon: 'fa-face-grin-beam'
},{
  name: '餐飲食品',
  icon: 'fa-utensils'
},{
  name: '其他',
  icon: 'fa-pen'
}]

db.once('open', async() => {
  try {
    for(let category of CATEGORY) {
      await Category.create(category)
        .catch(err => console.log(err))
    }
    console.log('category done')
  } catch(err){
    console.error(err)
  }
})