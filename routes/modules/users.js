const express = require('express')
const router = express.Router()

// login
router.get('/login', (req, res) => {
  res.send('login')
})
// logout
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router