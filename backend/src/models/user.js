const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    surnames: {
      type: String,
      required: true,
      unique: false,
    },
    birth: {
      type: Date,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
