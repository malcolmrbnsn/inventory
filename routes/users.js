const express = require('express')
const router = express.Router()
const db = require('../models')

/**
 * /signup routes
 * GET: renders the form
 * POST: signs up the user
 */
router.get('/signup', async (req, res) => {
  res.render('users/signup')
})

router.post('/signup', async (req, res, next) => {
  try {
    if (req.body.signupCode === process.env.SIGNUP_CODE) {
      const { email, password } = req.body
      const user = await db.User.create({
        email,
        password
      })

      // update session to log user in
      req.session.loggedIn = true

      return res.send(user)
    } else {
      return next({
        status: 400,
        message: 'Signup code is incorrect'
      })
    }
  } catch (error) {
    return next(error)
  }
})

/**
 * /login routes
 * GET: renders the form
 * POST: logs in the user
 */
router.get('/login', async (req, res) => {
  res.render('users/login')
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await db.User.findOne({
      email,
      password
    })
    return res.send(user)
  } catch (error) {
    return next(error)
  }
})

module.exports = router
