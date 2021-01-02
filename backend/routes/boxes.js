const express = require("express"),
  router = express.Router(),
  db = require("../models")

// Base route: /api/boxes
router.get("/", async (req, res, next) => {
  try {
    const boxes = await db.Box.find()
    return res.send({
      boxes
    })
  } catch (error) {
    return next(error)
  }
})

// Create a new box
router.post("/", async (req, res, next) => {
  try {
    let box = await db.Box.create({
      seller: req.body.sellerId,
      startDate: req.body.startDate,
      boxType: req.body.boxType
    });

    let seller = await db.Seller.findById(box.sellerId)
    await seller.boxes.push(box)
    await seller.save()

    return res.send(box);

  } catch (error) {
    next(error);
  }
})

// Get a specific box using the ID
router.get("/:id", async (req, res, next) => {
  try {
    let box = db.Box.findOne(req.params.id)
    return res.send({
      box
    })
    
  } catch (error) {
    return next(error)
  }
})

// Update a specific box
router.post("/:id", async (req, res, next) => {
  // update the box and save it
  let box = db.Box.findById(req.params.id);
})

router.delete("/:id", async (req, res, next) => {
  try {
   db.Box.deleteOne(req.params.id) 
   return res.send({
     success: true
   })
  } catch (error) {
    next(error)
  }
})

module.exports = router;
