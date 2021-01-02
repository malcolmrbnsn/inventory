const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);