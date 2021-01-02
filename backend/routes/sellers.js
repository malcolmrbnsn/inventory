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
    next(error);
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
    res.status(201)
    res.send(seller);
  } catch (error) {
    next(error)
  }
})

// get user
router.get("/:id", async (req, res, next) => {
  try {
    let seller = db.Seller.findOne(req.params.id)

    return res.send({
      seller
    })
  } catch (error) {
    return next(error)
  }
})

// update user
router.post("/:id", async (req, res, next) => {
})


// delete user
router.delete("/:id", async (req, res, next) => {
  try {
    db.Seller.deleteOne(req.params.id)
    return res.send({
      success: true
    })
  } catch (error) {
    return next(error) 
  }
})

module.exports = router;
