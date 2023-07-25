const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('success')
})

const port = 3000
app.listen(port, () =>{
  console.log(`Running on localhast:${port}`)
})