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
  let sellersDB = await db.Seller.find().populate("boxes").lean()
  let boxesDB = await db.Box.find({})

  let boxes = {
    unassigned: await db.Box.countDocuments({seller: {$exists: false}}),
     out: await db.Box.countDocuments({startDate: {$exists: true}}),
      sold: await db.Box.countDocuments({endDate: {$exists: true}})
    };


    let sellers = []
  sellersDB.forEach((seller, i) => {
    sellers[i] = {
      name: seller.name,
      out: db.Box.countDocuments({seller: seller._id, startDate: {$exists: true}}) - db.Box.countDocuments({seller: seller._id, startDate: {$exists: false}}),
      sold: db.Box.countDocuments({seller: seller._id, endDate: {$exists: true}})
    }
  });


  res.render('dashboard',
    {
      title: "Dashboard",
      boxes,
      sellers
    })
})

module.exports = router