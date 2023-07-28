const express = require('express')
const passport = require('passport')
const router = express.Router()

// login-facebook
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))
router.post('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router
