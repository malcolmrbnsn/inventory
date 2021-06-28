const mongoose = require('mongoose')
const Seller = require('./seller')

const BoxSchema = new mongoose.Schema({
  startDate: {
    type: Date
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
    required: false
  },
  amount: {
    type: String,
    required: true,
    default: 60
  },
  dateAdded: {
    type: Date,
    default: Date.now(),
    required: true
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