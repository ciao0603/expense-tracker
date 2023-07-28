const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
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
    req.flash('warning_msg', '帳號已存在，請直接登入')
    return res.redirect('/users/login')
  }
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位皆為必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不符' })
  }
  if (errors.length) {
    console.log(errors)
    return res.render('register', { errors, name, email, password, confirmPassword })
  }
  
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  await User
    .create({ name, email, password: hash })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
// logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出')
  res.redirect('/users/login')
})

module.exports = router