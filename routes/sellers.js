const express = require('express')
const router = express.Router()
const db = require('../models')

const checkAuth = require("../helpers/auth");
const seller = require('../models/seller');

// Base route: /sellers
router.get('/', checkAuth, async (req, res, next) => {
  try {
    let sellers = await db.Seller.find().populate("boxes").lean()
    sellers = sellers.map(seller => {
      let start = seller.boxes.filter(box => box.startDate).length
      let end = seller.boxes.filter(box => box.endDate).length
      return {
        boxesOut: (start - end),
        boxesSold: end,
        ...seller
      }
    })
    return res.render("sellers/index", {
      sellers: sellers,
      title: "Sellers"
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/', checkAuth, async (req, res, next) => {
  try {
    const data = req.body
    let seller = new db.Seller({
      name: data.name,
      email: data.email,
      boxes: []
    })
    await seller.save()
    req.flash("success", "Seller added")
    return res.redirect("/sellers")
  } catch (error) {
    console.log(error)
    req.flash("error", "An error occured.")
    next(error)
  }
})

router.put('/:id', checkAuth, async (req, res, next) => {
  try {
    let { name, email } = req.body;

    await db.Seller.findByIdAndUpdate(req.params.id, {
        name, email
    })

    req.flash("success", "Seller updated")
    return res.redirect("/sellers")
  } catch (error) {
    console.log(error)
    req.flash("error", "An error occured.")
    return res.redirect("/sellers")
  }
})

router.delete("/:id", checkAuth, async (req, res) => {
  let seller = await db.Seller.findOne({_id: req.params.id})
  console.log(seller.boxes)
  if (seller.boxes) {
    await seller.boxes.forEach(async id => {
      let box = await db.Box.findOne(id);
      if (box) {
        box.seller = undefined;
        await box.save();
      }
    })
  }
  await seller.remove();
  
  req.flash("success", "Seller deleted")
  return res.redirect("/sellers")
})

module.exports = router
