const express = require("express"),
  router = express.Router(),
  db = require("../models")

// Base route: /api/sellers
router.get("/", async (req, res, next) => {
  try {
    const sellers = await db.Seller.find()
    res.send({
      sellers
    })
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    seller = new db.Seller({
      name: data.name,
      email: data.email,
      boxes: []
    })
    await seller.save();
    res.send(seller)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
