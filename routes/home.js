const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.render('home', {
    session: req.session,
    title: "Home"
  })
})

router.get('/dashboard', function (req, res) {
  res.render('dashboard',
    {
      session: req.session,
      title: Dashboard
    })
})

module.exports = router
