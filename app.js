const express = require('express')
const app = express()

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

app.get('/', (req, res) => {
  res.send('success')
})

const port = 3000
app.listen(port, () =>{
  console.log(`Running on localhast:${port}`)
})