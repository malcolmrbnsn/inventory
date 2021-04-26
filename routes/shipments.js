const express = require('express')
const router = express.Router()
const db = require('../models')
const validateFields = require("../helpers/form")

const checkAuth = require("../helpers/auth");

router.get("/", checkAuth, async (req, res) => {
    try {
        let shipments = await db.Shipment.find().lean()
        return res.render("shipments/index", { shipments, session: req.session, title: "Shipments" })

    } catch (error) {
        throw new Error()
    }
})

router.post("/", checkAuth, async (req, res) => {
    try {
        let {
            quantity,
            ordered,
            cost,
            goodsRecieved,
            paymentSent
        } = req.body;

        goodsRecieved = goodsRecieved === 'on'
        paymentSent = paymentSent === 'on'

        if (!validateFields(quantity, cost, ordered)) {
            

            //need to alert user here


            
            return res.redirect("/shipments")
        }
        ordered = new Date(ordered)
        // Add 28 days to the date entered
        // FYI: 28 days is the account period for cadbury fundraising accounts
        let dueDate = new Date(ordered + (28 * 24 * 60 * 60 * 1000)) // this doesnt work!

        shipment = new db.Shipment({
            quantity,
            ordered,
            cost,
            goodsRecieved,
            paymentSent,
            dueDate
        })
        
        await shipment.save()

        return res.redirect("/shipments")

    } catch (error) {
        console.log(error)
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
            

            //need to alert user here


            
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
        }})
        
        return res.redirect("/shipments")

    } catch (error) {
        console.log(error)
    }
})

router.delete("/:id", checkAuth, async (req, res) => {
    await db.Shipment.findOneAndDelete(req.params.id)
    return res.redirect("/shipments")
})

module.exports = router