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
      session: req.session,
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
    return res.redirect("/sellers")
  } catch (error) {
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

    return res.redirect("/sellers")
  } catch (error) {




  }
})

router.delete("/:id", checkAuth, async (req, res) => {
    await db.Seller.findOneAndDelete(req.params.id)
    return res.redirect("/sellers")
})

module.exports = router
