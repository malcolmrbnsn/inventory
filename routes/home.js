const express = require('express')
const router = express.Router()
const checkAuth = require("../helpers/auth");

router.get('/', function (req, res) {
  res.render('home', {
    session: req.session,
    layout: false
  })
})

router.get('/dashboard', checkAuth, function (req, res) {
  res.render('dashboard',
    {
      session: req.session,
      title: "Dashboard"
    })
})

module.exports = router
