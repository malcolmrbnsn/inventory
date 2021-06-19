const express = require('express')
const router = express.Router()
const checkAuth = require("../helpers/auth");

router.get('/', function (req, res) {
  res.render('home', {
    layout: false
  })
})

router.get('/dashboard', checkAuth, function (req, res) {
  res.render('dashboard',
    {
      title: "Dashboard"
    })
})

module.exports = router