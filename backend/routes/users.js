const express = require('express'),
  router = express.Router(),
  db = require("../models");

router.get("/", async (req, res, next) => {
  try {
    res.send("")

  } catch (error) {
    next(error)
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    if (req.body.signupCode === process.env.SIGNUP_CODE) {
      let {email, password} = req.body
      let user = await db.User.create({
        email,
        password
      })

      // update session to log user in
      req.session.loggedIn = true

      return res.send(user)

    } else {
      return next({
        status: 400,
        message: "Signup code is incorrect"
      });
    }
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    
  let {email, password} = req.body
  let user = await db.User.findOne({
    email,
    password
  });
  return res.send(user)

  } catch (error) {
    return next(error);
  }
})

module.exports = router;
