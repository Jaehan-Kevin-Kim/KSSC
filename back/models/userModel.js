const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: Number, default: 0 }, // 0: general user, 1: admin
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
