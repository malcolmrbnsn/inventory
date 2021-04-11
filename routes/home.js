const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('home')
})

router.get('/dashboard', function (req, res) {
  res.render('dashboard')
})

module.exports = router
