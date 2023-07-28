const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const User = require('../models/user')

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return done(null, false, { message: 'no user' })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return done(null, false, { message: 'Email or password incorrect' })
      }
      return done(null, user)
    } catch (err) {
      return done(err, false)
    }
  }))

  passport.serializeUser(function (user, done) {
    done(null, user._id)
  })
  passport.deserializeUser(function (id, done) {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  });
}
