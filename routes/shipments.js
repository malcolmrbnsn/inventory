const express = require('express')
const router = express.Router()
const db = require('../models')
const {exists} = require("../helpers")

const checkAuth = require("../helpers/auth");

router.get("/", checkAuth, async (req, res) => {
    try {
        let shipments = await db.Shipment.find().lean()

        return res.render("shipments/index", { shipments, title: "Shipments" })
    } catch (error) {
    console.log(error)
        req.flash("error", "An error occured.")
        return res.redirect("/shipments")
    }
})

router.post("/", checkAuth, async (req, res) => {
    try {
        let {
            quantity,
            ordered,
            cost,
            goodsRecieved,
            paymentSent,
            boxType,
            addBoxes
        } = req.body;

        goodsRecieved = goodsRecieved === 'on'
        paymentSent = paymentSent === 'on'
        addBoxes = addBoxes === 'on'

        if (!exists(quantity, cost, ordered)) {
            req.flash("error", "Ensure all fields are correct")
            return res.redirect("/shipments")
        }

        ordered = new Date(ordered)
        // Add 28 days to the date entered
        // FYI: 28 days is the account period for cadbury fundraising accounts
        let dueDate = new Date(ordered + (28 * 24 * 60 * 60 * 1000)) // this doesnt work!

        if (addBoxes) {
        let boxes = []
        for (let index = 0; index < quantity; index++) {
            boxes.push({boxType, amount: 60})
        }
        db.Box.insertMany(boxes)
        }


        shipment = new db.Shipment({
            quantity,
            ordered,
            cost,
            goodsRecieved,
            paymentSent,
            dueDate
        })

        await shipment.save()

        req.flash("success", "Shipment added")
        return res.redirect("/shipments")

    } catch (error) {
    console.log(error)
        req.flash("error", "An error occured.")
        return res.redirect("/shipments")
    }
})

router.put("/:id", checkAuth, async (req, res) => {
    try {
        const { id } = req.params;
        let {
            quantity,
            ordered,
            cost,
            goodsRecieved,
            paymentSent
        } = req.body;

        goodsRecieved = goodsRecieved === 'on'
        paymentSent = paymentSent === 'on'

        if (quantity.length === 0 || cost.length === 0 || ordered.length === 0) {
            req.flash("error", "Ensure all fields are correct")
            return res.redirect("/shipments")
        }

        ordered = new Date(ordered)
        // Add 28 days to the date entered
        // FYI: 28 days is the account period for cadbury fundraising accounts
        let dueDate = new Date(ordered + (28 * 24 * 60 * 60 * 1000)) // this doesnt work!

        await db.Shipment.findOneAndUpdate(id, {
            $set: {
                quantity,
                ordered,
                cost,
                goodsRecieved,
                paymentSent,
                dueDate
            }
        })

        req.flash("success", "Shipment updated")
        return res.redirect("/shipments")

    } catch (error) {
    console.log(error)
        req.flash("error", "An error occured.")
        return res.redirect("/shipments")
    }
})

router.delete("/:id", checkAuth, async (req, res) => {
    try {
        await db.Shipment.findOneAndDelete(req.params.id)
        req.flash("success", "Shipment deleted")
        return res.redirect("/shipments")
    } catch (error) {
    console.log(error)
        req.flash("error", "An error occured.")
        return res.redirect("/shipments")

    }
})

module.exports = router