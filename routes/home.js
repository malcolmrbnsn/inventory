const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('home', {
    session: req.session
  })
})

router.get('/dashboard', function (req, res) {
  res.render('dashboard',
    {
      session: req.session
    })
})

module.exports = router
