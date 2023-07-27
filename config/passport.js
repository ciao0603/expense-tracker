const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

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
      if (password !== user.password) {
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
