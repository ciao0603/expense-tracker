const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../../models/user')

// login
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
// register
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const user = await User.findOne({ email })
  if (user) {
    console.log('user exist')
    res.redirect('/users/login')
  }
  await User
    .create({ name, email, password })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
// logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router