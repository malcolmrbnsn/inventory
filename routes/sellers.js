const express = require('express')
const router = express.Router()
const db = require('../models')

const checkAuth = require("../helpers/auth");

// Base route: /sellers
router.get('/', checkAuth, async (req, res, next) => {
  try {
    const sellers = await db.Seller.find().lean()
    return res.render("sellers/index", {
      sellers: sellers,
      title: "Sellers"
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', checkAuth, async (req, res, next) => {
  try {
    const data = req.body
    seller = new db.Seller({
      name: data.name,
      email: data.email,
      boxes: []
    })
    await seller.save()
    req.flash("success", "Seller added")
    return res.redirect("/sellers")
  } catch (error) {
    req.flash("error", "An error occured.")
    next(error)
  }
})

router.put('/:id', checkAuth, async (req, res, next) => {
  try {
    let {name, email} = req.body;

    await db.Seller.findByIdAndUpdate(req.params.id, {
      $set: {
        name, email
      }
    })

    req.flash("success", "Seller updated")
    return res.redirect("/sellers")
  } catch (error) {
    req.flash("error", "An error occured.")
    return res.redirect("/sellers")
  }
})

router.delete("/:id", checkAuth, async (req, res) => {
    await db.Seller.findOneAndDelete(req.params.id)
    req.flash("success", "Seller deleted")
    return res.redirect("/sellers")
})

module.exports = router
