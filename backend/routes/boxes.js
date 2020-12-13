const express = require("express"),
  router = express.Router(),
  db = require("../models")

// Base route: /api/boxes
router.get("/", async (req, res, next) => {
  try {
    const boxes = await db.Box.find()
    res.send({
      boxes
    })
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
})

module.exports = router;
