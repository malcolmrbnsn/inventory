const mongoose = require('mongoose')
const Box = require('./box')

const SellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  boxes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Box'
    }
  ]
})

module.exports = mongoose.model('Seller', SellerSchema)
