const express = require('express')
const router = express.Router()
const checkAuth = require("../helpers/auth");
const db = require('../models')

router.get('/', function (req, res) {
  res.render('home', {
    layout: false
  })
})

router.get('/dashboard', checkAuth, async function (req, res) {
  /*
  Boxes unassigned
  Boxes out
  Boxes sold
  Boxes sold this week
  Average days to sell per seller
  Average days to sell per box type
  Total earned
  Total earned this week
  Days until the shipment payment is due.
  */
  let stats = {unassigned: 0, out: 0, sold: 0};
  stats.unassigned = await db.Box.countDocuments({seller: {$exists: false}});
  stats.out = await db.Box.countDocuments({startDate: {$exists: true}});
  stats.sold = await db.Box.countDocuments({endDate: {$exists: true}});
  console.log(stats)

  res.render('dashboard',
    {
      title: "Dashboard",
      stats
    })
})

module.exports = router