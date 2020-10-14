const mongoose = require("mongoose");

const BoxSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  boxType: String,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller"
  }
});

module.exports = mongoose.model("Box", BoxSchema);