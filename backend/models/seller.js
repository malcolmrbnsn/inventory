const mongoose = require("mongoose");

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

sellerSchema.pre("remove", function(next) {
  try {
    if (this.hosts) {
      this.hosts.forEach(host => {
        Host.findByIdAndRemove(host._id);
      });
    }
    if (this.alarms) {
      this.alarms.forEach(alarm => {
        Alarm.findByIdAndRemove(alarm);
      });
    }

    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model("Seller", SellerSchema);