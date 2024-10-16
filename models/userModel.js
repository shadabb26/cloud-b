const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    validate: {
      validator: function (value) {
        return validator.isAlpha(value.replace(/\s/g, ""));
      },
    },
  },

  email: {
    type: String,
    required: [true, "A user must have a email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  images: {
    type: [String],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
