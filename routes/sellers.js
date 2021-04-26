const express = require('express')
const router = express.Router()
const db = require('../models')

// Base route: /sellers
router.get('/', async (req, res, next) => {
  try {
    const sellers = await db.Seller.find().lean()
    return res.render("sellers/index", {
      sellers: sellers,
      session: req.session
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

// get user
router.get('/:id', async (req, res, next) => {
  try {
    const seller = db.Seller.findOne(req.params.id)

    return res.status(200).send(seller)
  } catch (error) {
    return next(error)
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
