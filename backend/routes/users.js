const express = require('express'),
  router = express.Router(),
  db = require("../models");

router.get("/", async (req, res, next) => {
  // res.send("will show signed in user")
  // users = await db.User.find()
  // res.send(users)
});

router.post("/signup", async (req, res, next) => {
  try {
    console.log(req.body)
    let user = new db.User({

    })
    user.save()
    res.send(user)
    
  } catch (error) {
    next(error);

  }

});


module.exports = router;
