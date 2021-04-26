const express = require('express')
const router = express.Router()
const db = require('../models')
const { body, validationResult } = require('express-validator');

router.get("/", async (req, res) => {
    try {
        let shipments = db.Shipment.find().lean()
        return res.render("shipments/index", { shipments, session: req.session })

    } catch (error) {
        throw new Error()
    }
})

router.post("/", async (req, res) => {
    try {
        let {
            quantity,
            ordered,
            cost,
            goodsRecieved,
            paymentSent
        } = req.body;

        if (quantity.length === 0 || cost.length === 0 || ordered.length === 0) {
            //need to alert user
            return res.redirect("/shipments")
        }
        ordered = new Date(ordered)
        // Add 28 days to the date entered
        // FYI: 28 days is the account period for cadbury fundraising accounts
        let dueDate = new Date(ordered + (28 * 24 * 60 * 60 * 1000)) // this doesnt work!
        console.log(dueDate)

        shipment = new db.Shipment({
            quantity,
            ordered,
            cost,
            goodsRecieved,
            paymentSent,
            dueDate
        })

    } catch (error) {
        
    }
})

module.exports = router