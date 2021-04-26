const mongoose = require('mongoose')

const ShipmentSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    ordered: {
        type: Date,
        required: true,
        default: Date.now
    },
    cost: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    goodsRecieved: {
        type: Boolean,
        required: true,
        default: false
    },
    paymentSent: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('Shipment', ShipmentSchema)