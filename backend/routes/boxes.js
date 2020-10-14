const express = require("express"),
  router = express.Router(),
  db = require("../models")

// Base route: /api/boxes
router.get("/", async (req, res) => {
  try {
    const boxes = await db.Box.find()
    res.send({
      boxes
    })
  } catch (error) {
    console.log(error)
  }
})

router.post("/", async (req, res) => {
  try {

  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
