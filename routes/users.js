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
  res.render('users/signup',
    {
      title: "Signup"
    })
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
      req.flash("Success", "Logged in as " + user.email)
      return res.redirect("/dashboard")
    } catch (error) {
      console.log(error)
      req.flash("error", "An error ocurred")
      return res.redirect("/signup")
    }
  })

/**
 * /login routes
 * GET: renders the form
 * POST: logs in the user
 */
router.get('/login', async (req, res) => {
  res.render('users/login', {
    title: "Log In"
  })
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await db.User.findOne({
      email,
      password
    })
    if (!user) {
      throw new Error('E-mail address or password incorrect');
    }
    req.session = {
      user,
      loggedIn: true
    }
    req.flash("Success", "Logged in as " + user.email)
    return res.redirect("/dashboard")

  } catch (error) {
    console.log(error)
    req.flash("error", "An error occured")
    return res.redirect("/login")
  }
})

router.get("/signout", (req, res) => {
  req.session = { user: {}, loggedIn: false };
  req.flash("success", "Signed out")
  res.redirect("/")
})

module.exports = router
