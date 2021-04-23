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

// new seller
router.get("/new", async (req, res, next) => {
  return res.render("sellers/new", {session: req.session})
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
    return res.status(201).send(seller)
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

// delete user
router.delete('/:id', async (req, res, next) => {
  try {
    db.Seller.deleteOne(req.params.id)
    return res.send({
      success: true
    })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
