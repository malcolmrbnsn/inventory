const express = require('express')
const router = express.Router()
const db = require('../models')

const checkAuth = require("../helpers/auth");
const validateFields = require("../helpers/form");

// Base route: /api/boxes
router.get('/', checkAuth, async (req, res, next) => {
  try {
    const boxes = await db.Box.find().populate("seller").lean()
    const sellers = await db.Seller.find().lean()
    return res.render("boxes/index", { boxes, sellers, title: "Boxes" })
  } catch (error) {
    console.log(error)
    return next(error)
  }
})

// Create a new box
router.post('/', checkAuth, async (req, res) => {
  try {
    let {
      sellerId, startDate, boxType, amount
    } = req.body;
    if (!validateFields([sellerId, startDate, boxType, amount])) {
      req.flash("error", "Ensure all fields are correct")
      return res.redirect("/boxes")
    }

    const seller = await db.Seller.findById(sellerId)
    if (!seller) {
      req.flash("error", "Incorrect seller entered")
      return res.redirect("/boxes")
    }

    startDate = new Date(startDate)

    const box = await db.Box.create({
      seller: sellerId,
      startDate,
      boxType,
      amount
    })

    await seller.boxes.push(box)
    await seller.save()
    req.flash("success", "Box created!")
    return res.redirect("/boxes")
  } catch (error) {
    console.log(error)
    res.flash("error", "An error occured.")
    return res.redirect("/boxes")

  }
})

router.put('/:id', checkAuth, async (req, res) => {
  try {
    let {
      sellerId, startDate, boxType, amount
    } = req.body;

    if (!validateFields([sellerId, startDate, boxType, amount])) {
      req.flash("error", "Ensure all fields are correct")
      return res.redirect("/boxes")
    }

    startDate = new Date(startDate)
    let box = await db.Box.findById(req.params.id)


    if (box.seller._id === !sellerId) {
      box = await db.Box.findOneAndUpdate(req.params.id, {
        $set: {
          startDate,
          boxType,
          amount,
          seller: sellerId
        }
      })
      const oldSeller = await db.Seller.findById(sellerId);
      await oldSeller.boxes.remove(this._id)
      await oldSeller.save()

      const newSeller = await db.Seller.findById(sellerId);
      await newSeller.boxes.push(box)
      await newSeller.save()
    } else {
      await db.Box.findOneAndUpdate(req.params.id, {
        $set: {
          startDate,
          boxType,
          amount
        }
      })
    }

    req.flash("success", "Box updated")
    return res.redirect("/boxes")
  } catch (error) {
    console.log(error)
    req.flash("error", "An error occured")
    return res.redirect("/boxes")

  }
})

router.delete("/:id", checkAuth, async (req, res) => {
  await db.Box.findOneAndDelete(req.params.id)
  req.flash("success", "Box deleted")
  return res.redirect("/boxes")
})

module.exports = router
