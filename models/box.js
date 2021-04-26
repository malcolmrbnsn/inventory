const mongoose = require('mongoose')
const Seller = require('./seller')

const BoxSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  boxType: {
    type: String,
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
  amount: {
    type: String,
    required: true,
    default: 60
  }
})

BoxSchema.pre('remove', async function (next) {
  try {
    const seller = await Seller.findById(this.seller.id)
    await seller.boxes.remove(this._id)
    await seller.save()

    return next()
  } catch (err) {
    return next(err)
  }
})

module.exports = mongoose.model('Box', BoxSchema)