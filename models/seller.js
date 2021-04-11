const mongoose = require("mongoose");
const box = require("./box");

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
      ref: "Box"
    }
  ]
});

SellerSchema.pre("remove", function(next) {
  try {
    if (this.boxes) {
      this.boxes.forEach(box => {
        Box.findByIdAndRemove(box);
      });
    }

    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model("Seller", SellerSchema);