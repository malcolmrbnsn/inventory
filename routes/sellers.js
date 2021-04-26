const express = require('express')
const router = express.Router()
const db = require('../models')

// Base route: /sellers
router.get('/', async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
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

// update user
router.post('/:id', async (req, res, next) => {
})

router.delete("/:id", async (req, res) => {
    await db.Seller.findOneAndDelete(req.params.id)
    return res.redirect("/sellers")
})

module.exports = router
