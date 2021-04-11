const mongoose = require('mongoose')
const seller = require('./seller')

const BoxSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  boxType: String,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  }
})

BoxSchema.pre('remove', async function (next) {
  try {
    const seller = await Seller.findById(this.seller.id)
    await seller.alarms.remove(this._id)
    await seller.save()

    return next()
  } catch (err) {
    return next(err)
  }
})

module.exports = mongoose.model('Box', BoxSchema)
