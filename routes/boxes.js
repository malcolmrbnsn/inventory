const express = require('express')
const router = express.Router()
const db = require('../models')

const checkAuth = require("../helpers/auth");
const { exists } = require("../helpers");
const { sendMail } = require("../helpers/mail")

// Base route: /api/boxes
router.get('/', checkAuth, async (req, res, next) => {
  try {
    const boxes = await db.Box.find().populate("seller").lean()
    const sellers = await db.Seller.find().lean()
    boxes.map((box, i) => {
      if (box.startDate) {
        startDate = new Date(box.startDate)
        endDate = new Date()
        if (box.endDate) {
          endDate = box.endDate;
        }
        box.daysToSell = Math.floor((endDate - startDate) / (1000 * 3600 * 24))
        boxes[i] = box;
      }
    })

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
    if (!exists(boxType, amount)) {
      req.flash("error", "Ensure all fields are correct")
      return res.redirect("/boxes")
    }

    let box = new db.Box({
      boxType,
      amount
    })

    if (startDate) {
      startDate = new Date(startDate)
      box.startDate = startDate;
    }

    if (sellerId !== "-") {
      const seller = await db.Seller.findById(sellerId)
      if (seller) {
        box.seller = seller._id;
        await seller.boxes.push(box)
        await seller.save()
      }
    }

    await box.save();

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
      sellerId, startDate, endDate, boxType, amount
    } = req.body;

    if (!exists(boxType, amount)) {
      req.flash("error", "Ensure all fields are correct")
      return res.redirect("/boxes")
    }

    let box = await db.Box.findById(req.params.id)
    if (!box) {
      res.flash("error", "An error occured.")
      return res.redirect("/boxes")
    }

    box.boxType = boxType;
    box.amount = amount;

    if (startDate) {
      box.startDate = new Date(startDate)
    }

    if (endDate) {
      box.endDate = new Date(endDate)
    }

    //if there was a seller assigned before remove them
    if (box.seller) {
      const oldSeller = await db.Seller.findById(box.seller);
      await oldSeller.boxes.remove(box._id)
      await oldSeller.save()
    }

    // if there is a seller assigned
    if (sellerId !== "-") {

      // add the new seller if we find it
      const newSeller = await db.Seller.findById(sellerId);
      if (newSeller) {
        box.seller = sellerId
        await newSeller.boxes.push(box)
        await newSeller.save()
      }

    } else {
      box.seller = undefined;
    }

    await box.save()

    req.flash("success", "Box updated")
    return res.redirect("/boxes")
  } catch (error) {
    console.log(error)
    req.flash("error", "An error occured")
    return res.redirect("/boxes")

  }
})

router.delete("/:id", checkAuth, async (req, res) => {
  try {
    await db.Box.findOneAndDelete(req.params.id)
    req.flash("success", "Box deleted")
    return res.redirect("/boxes")
  } catch (error) {
    console.log(error)
    req.flash("error", "An error occured")
    return res.redirect("/boxes")
  }
})

module.exports = router
