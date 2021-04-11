const express = require('express')
const router = express.Router()
const db = require('../models')
const { body, validationResult } = require('express-validator');

/**
 * /signup routes
 * GET: renders the form
 * POST: signs up the user
 */
router.get('/signup', async (req, res) => {
  res.render('users/signup')
})

router.post('/signup',
  body('email').isEmail().custom(value => {
    return db.User.findOne({ email: value }).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  }),
  body('password', 'Password needs to be at least 5 characters').isLength({ min: 5 }),
  body('code', "Signup code is incorrect").equals(process.env.SIGNUP_CODE),
  async (req, res, next) => {
    try {
      // throw an error if the form was not validated successfully
      validationResult(req).throw();
      const { email, password } = req.body
      const user = await db.User.create({
        email,
        password
      })

      // update session to log user in
      req.session = {
        user,
        loggedIn: true
      }
      return res.redirect("/dashboard")
    } catch (error) {
      console.log(error.array())
      return res.render('users/signup', {
        errors: error.array()
      })
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
    if (!user) {
      throw new Error('E-mail or password incorrect');
    }
    req.session = {
      user,
      loggedIn: true
    }
    return res.redirect("/dashboard")
  } catch (error) {
    console.log(error.message)
    return res.render('users/login', {
      error: error.message
    })
  }
})

module.exports = router
