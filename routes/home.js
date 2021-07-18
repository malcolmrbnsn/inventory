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

  let started = await db.Box.countDocuments({startDate: {$exists: true}});
  let notStarted = await db.Box.countDocuments({startDate: {$exists: false}});
  let finished = await db.Box.countDocuments({endDate: {$exists: true}});

  let boxes = {
    unassigned: notStarted,
    out: started - finished,
    sold: finished
  };


    let sellers = []
    await sellersDB.forEach(async (seller, i) => {
      let started = await db.Box.countDocuments({seller: seller._id, startDate: {$exists: true}});
      let finished = await db.Box.countDocuments({seller: seller._id, endDate: {$exists: true}});

      sellers[i] = {
        name: seller.name,
        out: started - finished,
        sold: finished
      }
  });


  return res.render('dashboard',
    {
      title: "Dashboard",
      boxes,
      sellers
    })
})

module.exports = router
